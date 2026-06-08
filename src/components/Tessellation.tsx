import { useEffect, useRef } from "react";

/**
 * Animated triangular tessellation background inspired by Escher /
 * Islamic geometric tiling. Triangles share edges to form a perfect
 * tiling; each one pulses individually with a slow phase offset, and
 * a soft glow follows the cursor.
 */
export function Tessellation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let raf = 0;

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const mouse = { x: -9999, y: -9999 };
    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    const size = 64; // edge length of each equilateral triangle
    const h = (size * Math.sqrt(3)) / 2;

    let t = 0;

    const draw = () => {
      t += 0.008;

      // background gradient — deep navy
      const bg = ctx.createRadialGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.8,
      );
      bg.addColorStop(0, "#0b1430");
      bg.addColorStop(1, "#05080f");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      const cols = Math.ceil(width / (size / 2)) + 2;
      const rows = Math.ceil(height / h) + 2;

      for (let row = -1; row < rows; row++) {
        for (let col = -1; col < cols; col++) {
          const xOffset = (row % 2) * (size / 2);
          const x = col * size + xOffset;
          const y = row * h;

          // two triangles per cell: one pointing up, one pointing down
          const up = (col + row) % 2 === 0;

          // triangle centroid
          const cx = x + size / 2;
          const cy = up ? y + h * (2 / 3) : y + h * (1 / 3);

          // mouse proximity glow
          const dx = cx - mouse.x;
          const dy = cy - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const glow = Math.max(0, 1 - dist / 260);

          const pulse =
            0.5 + 0.5 * Math.sin(t * 1.2 + col * 0.35 + row * 0.55);

          const strokeA = 0.08 + pulse * 0.1 + glow * 0.35;
          const fillA = 0.015 + pulse * 0.025 + glow * 0.18;

          ctx.beginPath();
          if (up) {
            ctx.moveTo(x, y + h);
            ctx.lineTo(x + size, y + h);
            ctx.lineTo(x + size / 2, y);
          } else {
            ctx.moveTo(x, y);
            ctx.lineTo(x + size, y);
            ctx.lineTo(x + size / 2, y + h);
          }
          ctx.closePath();

          // hue shifts gently between cyan and indigo
          const hue = 200 + Math.sin(t + col * 0.2 + row * 0.2) * 30;
          ctx.fillStyle = `hsla(${hue}, 80%, 60%, ${fillA.toFixed(3)})`;
          ctx.fill();

          ctx.lineWidth = 1;
          ctx.strokeStyle = `hsla(${hue}, 70%, 70%, ${strokeA.toFixed(3)})`;
          ctx.stroke();
        }
      }

      // subtle vignette
      const vg = ctx.createRadialGradient(
        width / 2,
        height / 2,
        Math.min(width, height) * 0.3,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.75,
      );
      vg.addColorStop(0, "rgba(0,0,0,0)");
      vg.addColorStop(1, "rgba(0,0,0,0.55)");
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, width, height);

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