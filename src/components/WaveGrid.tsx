import { useEffect, useRef } from "react";

export function WaveGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const mouse = { x: width / 2, y: height / 2, active: false };
    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
      mouse.active = true;
    };
    const onLeave = () => (mouse.active = false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    const spacing = 38;
    let t = 0;

    const draw = () => {
      t += 0.012;

      // background
      const bg = ctx.createLinearGradient(0, 0, 0, height);
      bg.addColorStop(0, "#fafafa");
      bg.addColorStop(1, "#f1f1f3");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      const cols = Math.ceil(width / spacing) + 2;
      const rows = Math.ceil(height / spacing) + 2;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * spacing;
          const y = j * spacing;

          // wave displacement
          const wave =
            Math.sin(i * 0.35 + t) * 4 +
            Math.cos(j * 0.4 + t * 1.2) * 4;

          // mouse ripple
          let mx = 0;
          let my = 0;
          if (mouse.active) {
            const dx = x - mouse.x;
            const dy = y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const radius = 180;
            if (dist < radius) {
              const force = (1 - dist / radius) * 14;
              const angle = Math.atan2(dy, dx);
              mx = Math.cos(angle) * force;
              my = Math.sin(angle) * force;
            }
          }

          const px = x + wave + mx;
          const py = y + wave + my;

          const alpha = 0.18 + (Math.sin(i * 0.3 + j * 0.3 + t) + 1) * 0.15;
          ctx.fillStyle = `rgba(20,20,30,${alpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(px, py, 1.3, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}