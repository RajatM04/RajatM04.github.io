import React, { useEffect, useMemo, useRef } from "react";

function roundRectPath(ctx, x, y, w, h, r) {
  const rr = Math.max(0, Math.min(r, Math.min(w, h) / 2));
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.lineTo(x + w - rr, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + rr);
  ctx.lineTo(x + w, y + h - rr);
  ctx.quadraticCurveTo(x + w, y + h, x + w - rr, y + h);
  ctx.lineTo(x + rr, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - rr);
  ctx.lineTo(x, y + rr);
  ctx.quadraticCurveTo(x, y, x + rr, y);
  ctx.closePath();
}

function drawPencil(ctx, { ink, paper, body, band, eraser, press, angle }) {
  const scale = press ? 0.92 : 1;
  const length = 44;
  const width = 12;

  ctx.save();
  ctx.rotate(angle);
  ctx.scale(scale, scale);

  // Shadow
  ctx.globalAlpha = 0.22;
  ctx.fillStyle = ink;
  roundRectPath(ctx, -length / 2 + 5, -width / 2 + 5, length, width, width / 2);
  ctx.fill();
  ctx.globalAlpha = 1;

  // Body
  ctx.fillStyle = body;
  roundRectPath(ctx, -length / 2, -width / 2, length, width, width / 2);
  ctx.fill();
  ctx.strokeStyle = ink;
  ctx.lineWidth = 2.6;
  ctx.stroke();

  // Top highlight
  ctx.globalAlpha = 0.35;
  ctx.fillStyle = paper;
  roundRectPath(ctx, -length / 2 + 4, -width / 2 + 3, length - 18, 5, 4);
  ctx.fill();
  ctx.globalAlpha = 1;

  // Metal band
  ctx.fillStyle = band;
  roundRectPath(ctx, length / 2 - 18, -width / 2, 7, width, 4);
  ctx.fill();
  ctx.strokeStyle = ink;
  ctx.lineWidth = 2.2;
  ctx.stroke();

  // Eraser
  ctx.fillStyle = eraser;
  roundRectPath(ctx, length / 2 - 11, -width / 2, 11, width, width / 2);
  ctx.fill();
  ctx.strokeStyle = ink;
  ctx.lineWidth = 2.4;
  ctx.stroke();

  // Tip wood
  ctx.fillStyle = "#f3d6a8";
  ctx.beginPath();
  ctx.moveTo(-length / 2, -width / 2);
  ctx.lineTo(-length / 2 - 13, 0);
  ctx.lineTo(-length / 2, width / 2);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = ink;
  ctx.lineWidth = 2.4;
  ctx.stroke();

  // Lead
  ctx.fillStyle = ink;
  ctx.beginPath();
  ctx.moveTo(-length / 2 - 13, 0);
  ctx.lineTo(-length / 2 - 17.5, 0);
  ctx.lineTo(-length / 2 - 14.6, 2.5);
  ctx.closePath();
  ctx.fill();

  // Tiny notch mark
  ctx.globalAlpha = 0.85;
  ctx.strokeStyle = ink;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(length / 2 - 28, -width / 2 + 3);
  ctx.lineTo(length / 2 - 28, width / 2 - 3);
  ctx.stroke();
  ctx.globalAlpha = 1;

  ctx.restore();
}

export default function ScribbleCursor() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const targetRef = useRef({ x: -9999, y: -9999 });
  const posRef = useRef({ x: -9999, y: -9999 });
  const downRef = useRef(false);

  const enabled = useMemo(() => {
    if (typeof window === "undefined") return false;
    const fine = window.matchMedia?.("(pointer: fine)")?.matches ?? true;
    const reduce =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    return fine && !reduce;
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let mounted = true;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onMove = (event) => {
      targetRef.current = { x: event.clientX, y: event.clientY };
    };

    const onDown = (event) => {
      downRef.current = true;
      targetRef.current = { x: event.clientX, y: event.clientY };
    };

    const onUp = () => {
      downRef.current = false;
    };

    const onLeave = () => {
      targetRef.current = { x: -9999, y: -9999 };
      posRef.current = { x: -9999, y: -9999 };
    };

    const draw = () => {
      if (!mounted) return;

      const target = targetRef.current;
      const pos = posRef.current;
      const press = downRef.current;

      // Smooth follow: fast but not jittery.
      const lerp = press ? 0.35 : 0.28;
      pos.x = pos.x < -1000 ? target.x : pos.x + (target.x - pos.x) * lerp;
      pos.y = pos.y < -1000 ? target.y : pos.y + (target.y - pos.y) * lerp;

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      if (pos.x > -1000) {
        const styles = getComputedStyle(document.documentElement);
        const ink = styles.getPropertyValue("--ink").trim() || "#0b0b0b";
        const paper = styles.getPropertyValue("--paper").trim() || "#fffdf7";
        const a1 = styles.getPropertyValue("--accent").trim() || "#ffe3a3";
        const a2 = styles.getPropertyValue("--accent2").trim() || "#bfe9ff";
        const a3 = styles.getPropertyValue("--accent3").trim() || "#d7c8ff";
        const a4 = styles.getPropertyValue("--accent4").trim() || "#c9ffb8";

        const el = document.elementFromPoint(pos.x, pos.y);
        const onInteractive = Boolean(el?.closest?.("a,button,[role='button'],.extrudeInteractive"));

        const body = onInteractive ? a2 : a1;
        const band = onInteractive ? a4 : a2;
        const eraser = onInteractive ? a3 : a3;

        ctx.save();
        ctx.translate(pos.x, pos.y);
        drawPencil(ctx, {
          ink,
          paper,
          body,
          band,
          eraser,
          press,
          angle: -0.28
        });
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    window.addEventListener("blur", onLeave);
    window.addEventListener("mouseleave", onLeave);

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      mounted = false;
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("blur", onLeave);
      window.removeEventListener("mouseleave", onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [enabled]);

  if (!enabled) return null;

  return <canvas ref={canvasRef} className="scribbleCursor" aria-hidden="true" />;
}
