import React, { useEffect, useRef, useState, useCallback } from "react";
import { useTheme } from "@mui/material/styles";

const PIXEL_SIZE = 12;
const TRAIL_LENGTH = 40;
const FADE_SPEED = 0.04;

export function PixelCursorTrail() {
    // Use a ref for the container if needed, but we attach listeners to window
    const containerRef = useRef(null);
    const theme = useTheme();
    const cursorColor = theme.palette.mode === 'dark' ? '#ffffff' : '#000000';
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const [pixels, setPixels] = useState([]);

    if (isMobile) return null;
    const pixelIdRef = useRef(0);
    const lastPositionRef = useRef({ x: 0, y: 0 });
    const animationRef = useRef();

    const createPixel = useCallback((x, y) => {
        return {
            id: pixelIdRef.current++,
            x,
            y,
            opacity: 1,
            age: 0,
        };
    }, []);

    useEffect(() => {
        const handleMouseMove = (e) => {
            const x = e.clientX;
            const y = e.clientY;

            const dx = x - lastPositionRef.current.x;
            const dy = y - lastPositionRef.current.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance > PIXEL_SIZE) {
                const newPixel = createPixel(x, y);
                setPixels((prev) => [...prev.slice(-TRAIL_LENGTH), newPixel]);
                lastPositionRef.current = { x, y };
            }
        };

        window.addEventListener("mousemove", handleMouseMove);

        const animate = () => {
            setPixels((prev) =>
                prev
                    .map((pixel) => ({
                        ...pixel,
                        opacity: pixel.opacity - FADE_SPEED,
                        age: pixel.age + 1,
                    }))
                    .filter((pixel) => pixel.opacity > 0)
            );
            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [createPixel]);

    return (
        <div
            ref={containerRef}
            className="pixel-cursor-trail-container"
            style={{
                position: "fixed",
                inset: 0,
                width: "100vw",
                height: "100vh",
                pointerEvents: "none",
                zIndex: 9999, // Ensure it's on top
                overflow: "hidden",
            }}
        >
            {pixels.map((pixel) => {
                // Calculate size based on age - older pixels are smaller
                const sizeMultiplier = Math.max(0.3, 1 - pixel.age / 100);
                const currentSize = PIXEL_SIZE * sizeMultiplier;

                return (
                    <div
                        key={pixel.id}
                        style={{
                            position: "absolute",
                            left: pixel.x - currentSize / 2,
                            top: pixel.y - currentSize / 2,
                            width: currentSize,
                            height: currentSize,
                            backgroundColor: cursorColor,
                            opacity: pixel.opacity,
                            transition: "width 0.1s ease-out, height 0.1s ease-out",
                        }}
                    />
                );
            })}
        </div>
    );
}

export default PixelCursorTrail;
