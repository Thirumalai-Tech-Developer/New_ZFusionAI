import React, { useEffect, useRef } from "react";

export default function LiquidGlassCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Liquid droplets / ripple entities
    const droplets: Array<{
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      speed: number;
      opacity: number;
    }> = [];

    // Mouse tracker
    let mouse = { x: width / 2, y: height / 2, active: false };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;

      // Spawn subtle ripple on mouse move
      if (Math.random() < 0.25) {
        droplets.push({
          x: mouse.x,
          y: mouse.y,
          radius: 4,
          maxRadius: Math.random() * 80 + 40,
          speed: Math.random() * 1.5 + 1.2,
          opacity: 0.35,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Initial ambient fluid nodes
    for (let i = 0; i < 16; i++) {
      droplets.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 10,
        maxRadius: Math.random() * 120 + 60,
        speed: Math.random() * 0.8 + 0.4,
        opacity: Math.random() * 0.25 + 0.1,
      });
    }

    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Deep dark emerald fluid gradient backdrop
      const grad = ctx.createRadialGradient(
        width * 0.5 + Math.sin(time) * 100,
        height * 0.4 + Math.cos(time) * 80,
        50,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.8
      );
      grad.addColorStop(0, "rgba(37, 211, 102, 0.12)");
      grad.addColorStop(0.4, "rgba(18, 140, 126, 0.06)");
      grad.addColorStop(1, "rgba(3, 12, 7, 0.95)");

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Render fluid ripples
      for (let i = droplets.length - 1; i >= 0; i--) {
        const d = droplets[i];
        d.radius += d.speed;
        d.opacity -= 0.003;

        if (d.opacity <= 0 || d.radius >= d.maxRadius) {
          // Recycle ambient droplets
          d.x = Math.random() * width;
          d.y = Math.random() * height;
          d.radius = 2;
          d.maxRadius = Math.random() * 100 + 40;
          d.opacity = Math.random() * 0.2 + 0.1;
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(37, 211, 102, ${d.opacity})`;
        ctx.lineWidth = 1.5;
        ctx.shadowColor = "#25d366";
        ctx.shadowBlur = 12;
        ctx.stroke();

        // Inner caustic refraction ring
        ctx.beginPath();
        ctx.arc(d.x, d.y, Math.max(1, d.radius * 0.6), 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(167, 243, 208, ${d.opacity * 0.5})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
      aria-hidden="true"
    />
  );
}
