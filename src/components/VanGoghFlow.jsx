import React, { useRef, useEffect } from 'react';
import { Box } from '@mui/material';

const VanGoghFlow = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let particles = [];
        let stars = [];
        let width, height;

        // ORIGINAL STARRY NIGHT PALETTE (Deep Blues & Golds)
        const colors = [
            '#1a1a40', // Deepest Blue
            '#273c75', // Dark Blue
            '#487eb0', // Muted Blue
            '#0097e6', // Bright Blue
            '#7f8fa6', // Greyish Blue
            '#fbc531', // Bright Yellow
            '#e1b12c', // Golden Yellow
            '#f5f6fa'  // Off White
        ];

        // Simplex Noise Function
        const noise = (x, y) => {
            return Math.sin(x * 0.003) * Math.cos(y * 0.003) * Math.PI * 2;
        };

        class Star {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * (height * 0.6); // Top 60% of screen
                this.size = Math.random() * 10 + 5;
                this.baseColor = Math.random() > 0.8 ? '#fbc531' : '#f5f6fa';
                this.pulse = Math.random() * Math.PI;
            }

            draw(ctx) {
                // Subtle pulsation
                this.pulse += 0.03;
                const currentSize = this.size + Math.sin(this.pulse) * 2;
                const alpha = 0.5 + Math.sin(this.pulse) * 0.3;

                const gradient = ctx.createRadialGradient(this.x, this.y, 1, this.x, this.y, currentSize * 2);
                gradient.addColorStop(0, this.baseColor);
                gradient.addColorStop(0.4, `rgba(251, 197, 49, ${alpha})`);
                gradient.addColorStop(1, 'rgba(0,0,0,0)');

                ctx.save();
                ctx.globalCompositeOperation = 'screen';
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(this.x, this.y, currentSize * 2, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
        }

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.speed = Math.random() * 1.5 + 0.2;
                this.angle = 0;
                this.vx = 0;
                this.vy = 0;
                this.size = Math.random() * 2 + 1;
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.life = Math.random() * 100 + 50;
                this.history = []; // The "Line" tail
            }

            update(mouseX, mouseY) {
                const n = noise(this.x, this.y);
                this.angle = n;

                // Mouse Repulsion / Swirl
                const dx = this.x - mouseX;
                const dy = this.y - mouseY;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 250) {
                    const force = (250 - distance) / 250;
                    this.angle += Math.atan2(dy, dx) * force * 3;
                    this.speed += 0.1;
                } else {
                    this.speed = Math.max(0.5, this.speed * 0.99); // Slow down friction
                }

                this.vx = Math.cos(this.angle) * this.speed;
                this.vy = Math.sin(this.angle) * this.speed;
                this.x += this.vx;
                this.y += this.vy;

                // Wrap around
                if (this.x > width) this.x = 0;
                if (this.x < 0) this.x = width;
                if (this.y > height) this.y = 0;
                if (this.y < 0) this.y = height;

                // Create the LINE stroke
                this.history.push({ x: this.x, y: this.y });
                if (this.history.length > 15) { // Stroke length
                    this.history.shift();
                }
            }

            draw(ctx) {
                if (this.history.length < 2) return;

                ctx.beginPath();
                ctx.moveTo(this.history[0].x, this.history[0].y);

                // Smooth curves for organic lines
                for (let i = 1; i < this.history.length - 1; i++) {
                    const xc = (this.history[i].x + this.history[i + 1].x) / 2;
                    const yc = (this.history[i].y + this.history[i + 1].y) / 2;
                    ctx.quadraticCurveTo(this.history[i].x, this.history[i].y, xc, yc);
                }

                ctx.strokeStyle = this.color;
                ctx.lineWidth = this.size;
                ctx.lineCap = 'round';
                ctx.globalAlpha = 0.8;
                ctx.stroke();
                ctx.globalAlpha = 1.0;
            }
        }

        const init = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            particles = [];
            stars = [];

            // Adjust particle density for smooth lines
            const particleCount = Math.min(window.innerWidth / 1.2, 1000);
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }

            // A few nice stars
            for (let i = 0; i < 8; i++) {
                stars.push(new Star());
            }
        };

        const animate = () => {
            // "Fade" effect to keep trails slightly visible (Smeary look)
            ctx.fillStyle = '#101030';
            ctx.fillRect(0, 0, width, height);

            // Draw Stars first
            stars.forEach(s => s.draw(ctx));

            // Draw Lines (Particles)
            particles.forEach(p => {
                p.update(mouse.x, mouse.y);
                p.draw(ctx);
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        const mouse = { x: -1000, y: -1000 };
        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };

        window.addEventListener('resize', init);
        canvas.addEventListener('mousemove', handleMouseMove);

        init();
        animate();

        return () => {
            window.removeEventListener('resize', init);
            canvas.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <Box
            sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
                overflow: 'hidden',
                background: '#0a0a1e' // Deep dark blue base
            }}
        >
            <canvas ref={canvasRef} style={{ display: 'block' }} />
        </Box>
    );
};

export default VanGoghFlow;
