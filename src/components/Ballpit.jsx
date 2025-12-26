import React, { useRef, useEffect } from 'react';
import {
    Clock,
    PerspectiveCamera,
    Scene,
    WebGLRenderer,
    SRGBColorSpace,
    MathUtils,
    Vector2,
    Vector3,
    MeshPhysicalMaterial,
    ShaderChunk,
    Color,
    Object3D,
    InstancedMesh,
    PMREMGenerator,
    SphereGeometry,
    AmbientLight,
    PointLight,
    ACESFilmicToneMapping,
    Raycaster,
    Plane
} from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { gsap } from 'gsap';

// Note: Observer is not explicitly exported by 'gsap' in standard imports usually, 
// but the user provided code imports it from 'gsap/Observer'. 
// If this fails, we might need to adjust based on installed gsap version.
// Checking package.json, gsap is ^3.14.2.
import { Observer } from 'gsap/Observer';

gsap.registerPlugin(Observer);

class X {
    #config;
    #postprocessing;
    #resizeObserver;
    #intersectionObserver;
    #resizeTimer;
    #animationFrameId = 0;
    #clock = new Clock();
    #animationState = { elapsed: 0, delta: 0 };
    #isAnimating = false;
    #isVisible = false;

    canvas;
    camera;
    cameraMinAspect;
    cameraMaxAspect;
    cameraFov;
    maxPixelRatio;
    minPixelRatio;
    scene;
    renderer;
    size = {
        width: 0,
        height: 0,
        wWidth: 0,
        wHeight: 0,
        ratio: 0,
        pixelRatio: 0
    };

    render = this.#render.bind(this);
    onBeforeRender = () => { };
    onAfterRender = () => { };
    onAfterResize = () => { };
    isDisposed = false;

    constructor(config) {
        this.#config = { ...config };
        this.#initCamera();
        this.#initScene();
        this.#initRenderer();
        this.resize();
        this.#initObservers();
    }

    #initCamera() {
        this.camera = new PerspectiveCamera();
        this.cameraFov = this.camera.fov;
    }

    #initScene() {
        this.scene = new Scene();
    }

    #initRenderer() {
        if (this.#config.canvas) {
            this.canvas = this.#config.canvas;
        } else if (this.#config.id) {
            const elem = document.getElementById(this.#config.id);
            if (elem instanceof HTMLCanvasElement) {
                this.canvas = elem;
            } else {
                console.error('Three: Missing canvas or id parameter');
            }
        } else {
            console.error('Three: Missing canvas or id parameter');
        }
        this.canvas.style.display = 'block';
        const rendererOptions = {
            canvas: this.canvas,
            powerPreference: 'high-performance',
            ...(this.#config.rendererOptions ?? {})
        };
        this.renderer = new WebGLRenderer(rendererOptions);
        this.renderer.outputColorSpace = SRGBColorSpace;
    }

    #initObservers() {
        if (!(this.#config.size instanceof Object)) {
            window.addEventListener('resize', this.#onResize.bind(this));
            if (this.#config.size === 'parent' && this.canvas.parentNode) {
                this.#resizeObserver = new ResizeObserver(this.#onResize.bind(this));
                this.#resizeObserver.observe(this.canvas.parentNode);
            }
        }
        this.#intersectionObserver = new IntersectionObserver(this.#onIntersection.bind(this), {
            root: null,
            rootMargin: '0px',
            threshold: 0
        });
        this.#intersectionObserver.observe(this.canvas);
        document.addEventListener('visibilitychange', this.#onVisibilityChange.bind(this));
    }

    #onResize() {
        if (this.#resizeTimer) clearTimeout(this.#resizeTimer);
        this.#resizeTimer = window.setTimeout(this.resize.bind(this), 100);
    }

    resize() {
        let w, h;
        if (this.#config.size instanceof Object) {
            w = this.#config.size.width;
            h = this.#config.size.height;
        } else if (this.#config.size === 'parent' && this.canvas.parentNode) {
            w = this.canvas.parentNode.offsetWidth;
            h = this.canvas.parentNode.offsetHeight;
        } else {
            w = window.innerWidth;
            h = window.innerHeight;
        }
        this.size.width = w;
        this.size.height = h;
        this.size.ratio = w / h;
        this.#updateCamera();
        this.#updateRenderer();
        this.onAfterResize(this.size);
    }

    #updateCamera() {
        this.camera.aspect = this.size.width / this.size.height;
        if (this.camera.isPerspectiveCamera && this.cameraFov) {
            if (this.cameraMinAspect && this.camera.aspect < this.cameraMinAspect) {
                this.#adjustFov(this.cameraMinAspect);
            } else if (this.cameraMaxAspect && this.camera.aspect > this.cameraMaxAspect) {
                this.#adjustFov(this.cameraMaxAspect);
            } else {
                this.camera.fov = this.cameraFov;
            }
        }
        this.camera.updateProjectionMatrix();
        this.updateWorldSize();
    }

    #adjustFov(aspect) {
        const tanFov = Math.tan(MathUtils.degToRad(this.cameraFov / 2));
        const newTan = tanFov / (this.camera.aspect / aspect);
        this.camera.fov = 2 * MathUtils.radToDeg(Math.atan(newTan));
    }

    updateWorldSize() {
        if (this.camera.isPerspectiveCamera) {
            const fovRad = (this.camera.fov * Math.PI) / 180;
            this.size.wHeight = 2 * Math.tan(fovRad / 2) * this.camera.position.length();
            this.size.wWidth = this.size.wHeight * this.camera.aspect;
        } else if (this.camera.isOrthographicCamera) {
            const cam = this.camera;
            this.size.wHeight = cam.top - cam.bottom;
            this.size.wWidth = cam.right - cam.left;
        }
    }

    #updateRenderer() {
        this.renderer.setSize(this.size.width, this.size.height);
        this.#postprocessing?.setSize(this.size.width, this.size.height);
        let pr = window.devicePixelRatio;
        if (this.maxPixelRatio && pr > this.maxPixelRatio) {
            pr = this.maxPixelRatio;
        } else if (this.minPixelRatio && pr < this.minPixelRatio) {
            pr = this.minPixelRatio;
        }
        this.renderer.setPixelRatio(pr);
        this.size.pixelRatio = pr;
    }

    get postprocessing() {
        return this.#postprocessing;
    }
    set postprocessing(value) {
        this.#postprocessing = value;
        this.render = value.render.bind(value);
    }

    #onIntersection(entries) {
        this.#isAnimating = entries[0].isIntersecting;
        this.#isAnimating ? this.#startAnimation() : this.#stopAnimation();
    }

    #onVisibilityChange() {
        if (this.#isAnimating) {
            document.hidden ? this.#stopAnimation() : this.#startAnimation();
        }
    }

    #startAnimation() {
        if (this.#isVisible) return;
        const animateFrame = () => {
            this.#animationFrameId = requestAnimationFrame(animateFrame);
            this.#animationState.delta = this.#clock.getDelta();
            this.#animationState.elapsed += this.#animationState.delta;
            this.onBeforeRender(this.#animationState);
            this.render();
            this.onAfterRender(this.#animationState);
        };
        this.#isVisible = true;
        this.#clock.start();
        animateFrame();
    }

    #stopAnimation() {
        if (this.#isVisible) {
            cancelAnimationFrame(this.#animationFrameId);
            this.#isVisible = false;
            this.#clock.stop();
        }
    }

    #render() {
        this.renderer.render(this.scene, this.camera);
    }

    clear() {
        this.scene.traverse(obj => {
            if (obj.isMesh && typeof obj.material === 'object' && obj.material !== null) {
                Object.keys(obj.material).forEach(key => {
                    const matProp = obj.material[key];
                    if (matProp && typeof matProp === 'object' && typeof matProp.dispose === 'function') {
                        matProp.dispose();
                    }
                });
                obj.material.dispose();
                obj.geometry.dispose();
            }
        });
        this.scene.clear();
    }

    dispose() {
        this.#onResizeCleanup();
        this.#stopAnimation();
        this.clear();
        this.#postprocessing?.dispose();
        this.renderer.dispose();
        this.isDisposed = true;
    }

    #onResizeCleanup() {
        window.removeEventListener('resize', this.#onResize.bind(this));
        this.#resizeObserver?.disconnect();
        this.#intersectionObserver?.disconnect();
        document.removeEventListener('visibilitychange', this.#onVisibilityChange.bind(this));
    }
}

class W {
    config;
    positionData;
    velocityData;
    sizeData;
    center = new Vector3();

    constructor(config) {
        this.config = config;
        this.positionData = new Float32Array(3 * config.count).fill(0);
        this.velocityData = new Float32Array(3 * config.count).fill(0);
        this.sizeData = new Float32Array(config.count).fill(1);
        this.center = new Vector3();
        this.#initializePositions();
        this.setSizes();
    }

    #initializePositions() {
        const { config, positionData } = this;
        this.center.toArray(positionData, 0);
        for (let i = 1; i < config.count; i++) {
            const idx = 3 * i;
            positionData[idx] = MathUtils.randFloatSpread(2 * config.maxX);
            positionData[idx + 1] = MathUtils.randFloatSpread(2 * config.maxY);
            positionData[idx + 2] = MathUtils.randFloatSpread(2 * config.maxZ);
        }
    }

    setSizes() {
        const { config, sizeData } = this;
        sizeData[0] = config.size0;
        for (let i = 1; i < config.count; i++) {
            sizeData[i] = MathUtils.randFloat(config.minSize, config.maxSize);
        }
    }

    update(deltaInfo) {
        const { config, center, positionData, sizeData, velocityData } = this;
        let startIdx = 0;
        if (config.controlSphere0) {
            startIdx = 1;
            const firstVec = new Vector3().fromArray(positionData, 0);
            firstVec.lerp(center, 0.1).toArray(positionData, 0);
            new Vector3(0, 0, 0).toArray(velocityData, 0);
        }
        for (let idx = startIdx; idx < config.count; idx++) {
            const base = 3 * idx;
            const pos = new Vector3().fromArray(positionData, base);
            const vel = new Vector3().fromArray(velocityData, base);
            vel.y -= deltaInfo.delta * config.gravity * sizeData[idx];
            vel.multiplyScalar(config.friction);
            vel.clampLength(0, config.maxVelocity);
            pos.add(vel);
            pos.toArray(positionData, base);
            vel.toArray(velocityData, base);
        }
        for (let idx = startIdx; idx < config.count; idx++) {
            const base = 3 * idx;
            const pos = new Vector3().fromArray(positionData, base);
            const vel = new Vector3().fromArray(velocityData, base);
            const radius = sizeData[idx];
            for (let jdx = idx + 1; jdx < config.count; jdx++) {
                const otherBase = 3 * jdx;
                const otherPos = new Vector3().fromArray(positionData, otherBase);
                const otherVel = new Vector3().fromArray(velocityData, otherBase);
                const diff = new Vector3().copy(otherPos).sub(pos);
                const dist = diff.length();
                const sumRadius = radius + sizeData[jdx];
                if (dist < sumRadius) {
                    const overlap = sumRadius - dist;
                    const correction = diff.normalize().multiplyScalar(0.5 * overlap);
                    const velCorrection = correction.clone().multiplyScalar(Math.max(vel.length(), 1));
                    pos.sub(correction);
                    vel.sub(velCorrection);
                    pos.toArray(positionData, base);
                    vel.toArray(velocityData, base);
                    otherPos.add(correction);
                    otherVel.add(correction.clone().multiplyScalar(Math.max(otherVel.length(), 1)));
                    otherPos.toArray(positionData, otherBase);
                    otherVel.toArray(velocityData, otherBase);
                }
            }
            if (config.controlSphere0) {
                const diff = new Vector3().copy(new Vector3().fromArray(positionData, 0)).sub(pos);
                const d = diff.length();
                const sumRadius0 = radius + sizeData[0];
                if (d < sumRadius0) {
                    const correction = diff.normalize().multiplyScalar(sumRadius0 - d);
                    const velCorrection = correction.clone().multiplyScalar(Math.max(vel.length(), 2));
                    pos.sub(correction);
                    vel.sub(velCorrection);
                }
            }
            if (Math.abs(pos.x) + radius > config.maxX) {
                pos.x = Math.sign(pos.x) * (config.maxX - radius);
                vel.x = -vel.x * config.wallBounce;
            }
            if (config.gravity === 0) {
                if (Math.abs(pos.y) + radius > config.maxY) {
                    pos.y = Math.sign(pos.y) * (config.maxY - radius);
                    vel.y = -vel.y * config.wallBounce;
                }
            } else if (pos.y - radius < -config.maxY) {
                pos.y = -config.maxY + radius;
                vel.y = -vel.y * config.wallBounce;
            }
            const maxBoundary = Math.max(config.maxZ, config.maxSize);
            if (Math.abs(pos.z) + radius > maxBoundary) {
                pos.z = Math.sign(pos.z) * (config.maxZ - radius);
                vel.z = -vel.z * config.wallBounce;
            }
            pos.toArray(positionData, base);
            vel.toArray(velocityData, base);
        }
    }
}

class Y extends MeshPhysicalMaterial {
    uniforms = {
        thicknessDistortion: { value: 0.1 },
        thicknessAmbient: { value: 0 },
        thicknessAttenuation: { value: 0.1 },
        thicknessPower: { value: 2 },
        thicknessScale: { value: 10 }
    };

    constructor(params) {
        super(params);
        this.defines = { USE_UV: '' };
        this.onBeforeCompile = shader => {
            Object.assign(shader.uniforms, this.uniforms);
            shader.fragmentShader =
                `
        uniform float thicknessPower;
        uniform float thicknessScale;
        uniform float thicknessDistortion;
        uniform float thicknessAmbient;
        uniform float thicknessAttenuation;
        ` + shader.fragmentShader;
            shader.fragmentShader = shader.fragmentShader.replace(
                'void main() {',
                `
        void RE_Direct_Scattering(const in IncidentLight directLight, const in vec2 uv, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, inout ReflectedLight reflectedLight) {
          vec3 scatteringHalf = normalize(directLight.direction + (geometryNormal * thicknessDistortion));
          float scatteringDot = pow(saturate(dot(geometryViewDir, -scatteringHalf)), thicknessPower) * thicknessScale;
          #ifdef USE_COLOR
            vec3 scatteringIllu = (scatteringDot + thicknessAmbient) * vColor;
          #else
            vec3 scatteringIllu = (scatteringDot + thicknessAmbient) * diffuse;
          #endif
          reflectedLight.directDiffuse += scatteringIllu * thicknessAttenuation * directLight.color;
        }

        void main() {
        `
            );
            const lightsChunk = ShaderChunk.lights_fragment_begin.replaceAll(
                'RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );',
                `
          RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
          RE_Direct_Scattering(directLight, vUv, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, reflectedLight);
        `
            );
            shader.fragmentShader = shader.fragmentShader.replace('#include <lights_fragment_begin>', lightsChunk);
            if (this.onBeforeCompile2) this.onBeforeCompile2(shader);
        };
    }
}

const XConfig = {
    count: 200,
    colors: [0x6A0DAD, 0x9370DB, 0x4B0082], // Purple shades
    ambientColor: 0xffffff,
    ambientIntensity: 1,
    lightIntensity: 200,
    materialParams: {
        metalness: 0.5,
        roughness: 0.5,
        clearcoat: 1,
        clearcoatRoughness: 0.15
    },
    minSize: 0.5,
    maxSize: 1,
    size0: 1,
    gravity: 0.5,
    friction: 0.9975,
    wallBounce: 0.95,
    maxVelocity: 0.15,
    maxX: 5,
    maxY: 5,
    maxZ: 2,
    controlSphere0: false,
    followCursor: true
};

const U = new Object3D();

let globalPointerActive = false;
const pointerPosition = new Vector2();

const pointerMap = new Map();

function createPointerData(options) {
    const defaultData = {
        position: new Vector2(),
        nPosition: new Vector2(),
        hover: false,
        touching: false,
        onEnter: () => { },
        onMove: () => { },
        onClick: () => { },
        onLeave: () => { },
        ...options
    };
    if (!pointerMap.has(options.domElement)) {
        pointerMap.set(options.domElement, defaultData);
        if (!globalPointerActive) {
            document.body.addEventListener('pointermove', onPointerMove);
            document.body.addEventListener('pointerleave', onPointerLeave);
            document.body.addEventListener('click', onPointerClick);

            document.body.addEventListener('touchstart', onTouchStart, { passive: false });
            document.body.addEventListener('touchmove', onTouchMove, { passive: false });
            document.body.addEventListener('touchend', onTouchEnd, { passive: false });
            document.body.addEventListener('touchcancel', onTouchEnd, { passive: false });
            globalPointerActive = true;
        }
    }
    defaultData.dispose = () => {
        pointerMap.delete(options.domElement);
        if (pointerMap.size === 0) {
            document.body.removeEventListener('pointermove', onPointerMove);
            document.body.removeEventListener('pointerleave', onPointerLeave);
            document.body.removeEventListener('click', onPointerClick);

            document.body.removeEventListener('touchstart', onTouchStart);
            document.body.removeEventListener('touchmove', onTouchMove);
            document.body.removeEventListener('touchend', onTouchEnd);
            document.body.removeEventListener('touchcancel', onTouchEnd);
            globalPointerActive = false;
        }
    };
    return defaultData;
}

function onPointerMove(e) {
    pointerPosition.set(e.clientX, e.clientY);
    processPointerInteraction();
}

function processPointerInteraction() {
    for (const [elem, data] of pointerMap) {
        const rect = elem.getBoundingClientRect();
        if (isInside(rect)) {
            updatePointerData(data, rect);
            if (!data.hover) {
                data.hover = true;
                data.onEnter(data);
            }
            data.onMove(data);
        } else if (data.hover && !data.touching) {
            data.hover = false;
            data.onLeave(data);
        }
    }
}

function onTouchStart(e) {
    if (e.touches.length > 0) {
        e.preventDefault();
        pointerPosition.set(e.touches[0].clientX, e.touches[0].clientY);
        for (const [elem, data] of pointerMap) {
            const rect = elem.getBoundingClientRect();
            if (isInside(rect)) {
                data.touching = true;
                updatePointerData(data, rect);
                if (!data.hover) {
                    data.hover = true;
                    data.onEnter(data);
                }
                data.onMove(data);
            }
        }
    }
}

function onTouchMove(e) {
    if (e.touches.length > 0) {
        e.preventDefault();
        pointerPosition.set(e.touches[0].clientX, e.touches[0].clientY);
        for (const [elem, data] of pointerMap) {
            const rect = elem.getBoundingClientRect();
            updatePointerData(data, rect);
            if (isInside(rect)) {
                if (!data.hover) {
                    data.hover = true;
                    data.touching = true;
                    data.onEnter(data);
                }
                data.onMove(data);
            } else if (data.hover && data.touching) {
                data.onMove(data);
            }
        }
    }
}

function onTouchEnd() {
    for (const [, data] of pointerMap) {
        if (data.touching) {
            data.touching = false;
            if (data.hover) {
                data.hover = false;
                data.onLeave(data);
            }
        }
    }
}

function onPointerClick(e) {
    pointerPosition.set(e.clientX, e.clientY);
    for (const [elem, data] of pointerMap) {
        const rect = elem.getBoundingClientRect();
        updatePointerData(data, rect);
        if (isInside(rect)) data.onClick(data);
    }
}

function onPointerLeave() {
    for (const data of pointerMap.values()) {
        if (data.hover) {
            data.hover = false;
            data.onLeave(data);
        }
    }
}

function updatePointerData(data, rect) {
    data.position.set(pointerPosition.x - rect.left, pointerPosition.y - rect.top);
    data.nPosition.set((data.position.x / rect.width) * 2 - 1, (-data.position.y / rect.height) * 2 + 1);
}

function isInside(rect) {
    return (
        pointerPosition.x >= rect.left &&
        pointerPosition.x <= rect.left + rect.width &&
        pointerPosition.y >= rect.top &&
        pointerPosition.y <= rect.top + rect.height
    );
}

class Z extends InstancedMesh {
    config;
    physics;
    ambientLight;
    light;

    constructor(renderer, params = {}) {
        const config = { ...XConfig, ...params };
        const roomEnv = new RoomEnvironment();
        const pmrem = new PMREMGenerator(renderer);
        const envTexture = pmrem.fromScene(roomEnv).texture;
        const geometry = new SphereGeometry();
        const material = new Y({ envMap: envTexture, ...config.materialParams });
        material.envMapRotation.x = -Math.PI / 2;
        super(geometry, material, config.count);
        this.config = config;
        this.physics = new W(config);
        this.#setupLights();
        this.setColors(config.colors);
    }

    #setupLights() {
        this.ambientLight = new AmbientLight(this.config.ambientColor, this.config.ambientIntensity);
        this.add(this.ambientLight);
        this.light = new PointLight(this.config.colors[0], this.config.lightIntensity);
        this.add(this.light);
    }

    setColors(colors) {
        if (Array.isArray(colors) && colors.length > 1) {
            const colorUtils = (function (colorsArr) {
                let baseColors = colorsArr;
                let colorObjects = [];
                baseColors.forEach(col => {
                    colorObjects.push(new Color(col));
                });
                return {
                    setColors: (cols) => {
                        baseColors = cols;
                        colorObjects = [];
                        baseColors.forEach(col => {
                            colorObjects.push(new Color(col));
                        });
                    },
                    getColorAt: (ratio, out = new Color()) => {
                        const clamped = Math.max(0, Math.min(1, ratio));
                        const scaled = clamped * (baseColors.length - 1);
                        const idx = Math.floor(scaled);
                        const start = colorObjects[idx];
                        if (idx >= baseColors.length - 1) return start.clone();
                        const alpha = scaled - idx;
                        const end = colorObjects[idx + 1];
                        out.r = start.r + alpha * (end.r - start.r);
                        out.g = start.g + alpha * (end.g - start.g);
                        out.b = start.b + alpha * (end.b - start.b);
                        return out;
                    }
                };
            })(colors);
            for (let idx = 0; idx < this.count; idx++) {
                this.setColorAt(idx, colorUtils.getColorAt(idx / this.count));
                if (idx === 0) {
                    this.light.color.copy(colorUtils.getColorAt(idx / this.count));
                }
            }

            if (!this.instanceColor) return;
            this.instanceColor.needsUpdate = true;
        }
    }

    update(deltaInfo) {
        this.physics.update(deltaInfo);
        for (let idx = 0; idx < this.count; idx++) {
            U.position.fromArray(this.physics.positionData, 3 * idx);
            if (idx === 0 && this.config.followCursor === false) {
                U.scale.setScalar(0);
            } else {
                U.scale.setScalar(this.physics.sizeData[idx]);
            }
            U.updateMatrix();
            this.setMatrixAt(idx, U.matrix);
            if (idx === 0) this.light.position.copy(U.position);
        }
        this.instanceMatrix.needsUpdate = true;
    }
}

function createBallpit(canvas, config = {}) {
    const threeInstance = new X({
        canvas,
        size: 'parent',
        rendererOptions: { antialias: true, alpha: true }
    });
    let spheres;
    threeInstance.renderer.toneMapping = ACESFilmicToneMapping;
    threeInstance.camera.position.set(0, 0, 20);
    threeInstance.camera.lookAt(0, 0, 0);
    threeInstance.cameraMaxAspect = 1.5;
    threeInstance.resize();
    initialize(config);
    const raycaster = new Raycaster();
    const plane = new Plane(new Vector3(0, 0, 1), 0);
    const intersectionPoint = new Vector3();
    let isPaused = false;

    canvas.style.touchAction = 'none';
    canvas.style.userSelect = 'none';
    canvas.style.webkitUserSelect = 'none';

    const pointerData = createPointerData({
        domElement: canvas,
        onMove() {
            raycaster.setFromCamera(pointerData.nPosition, threeInstance.camera);
            threeInstance.camera.getWorldDirection(plane.normal);
            raycaster.ray.intersectPlane(plane, intersectionPoint);
            spheres.physics.center.copy(intersectionPoint);
            spheres.config.controlSphere0 = true;
        },
        onLeave() {
            spheres.config.controlSphere0 = false;
        }
    });
    function initialize(cfg) {
        if (spheres) {
            threeInstance.clear();
            threeInstance.scene.remove(spheres);
        }
        spheres = new Z(threeInstance.renderer, cfg);
        threeInstance.scene.add(spheres);
    }
    threeInstance.onBeforeRender = deltaInfo => {
        if (!isPaused) spheres.update(deltaInfo);
    };
    threeInstance.onAfterResize = size => {
        spheres.config.maxX = size.wWidth / 2;
        spheres.config.maxY = size.wHeight / 2;
    };
    return {
        three: threeInstance,
        get spheres() {
            return spheres;
        },
        setCount(count) {
            initialize({ ...spheres.config, count });
        },
        togglePause() {
            isPaused = !isPaused;
        },
        dispose() {
            pointerData.dispose?.();
            threeInstance.dispose();
        }
    };
}

const Ballpit = ({ className = '', followCursor = true, ...props }) => {
    const canvasRef = useRef(null);
    const spheresInstanceRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        spheresInstanceRef.current = createBallpit(canvas, {
            followCursor,
            ...props
        });

        return () => {
            if (spheresInstanceRef.current) {
                spheresInstanceRef.current.dispose();
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <canvas className={`${className} w-full h-full`} ref={canvasRef} />;
};

export default Ballpit;
