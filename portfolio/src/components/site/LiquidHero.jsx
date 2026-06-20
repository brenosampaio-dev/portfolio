"use client";

import { useEffect, useRef } from "react";

/*
 * LiquidHero — a contained WebGL flourish for the empty hero media slot.
 * A slow, flowing field in the brand palette (paper → clay) that bulges
 * gently toward the cursor. Self-contained: one canvas in one box, trivially
 * removable. Lazy-loads ogl, pauses when offscreen, and degrades to a static
 * CSS gradient under reduced motion or if WebGL/ogl is unavailable.
 */
const VERT = `
  attribute vec2 uv;
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const FRAG = `
  precision highp float;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uRes;
  varying vec2 vUv;

  // brand palette
  const vec3 paper    = vec3(0.980, 0.980, 0.980);
  const vec3 clay     = vec3(0.235, 0.290, 0.388);
  const vec3 graphite = vec3(0.310, 0.345, 0.412);

  // cheap flowing field from layered sines (no noise texture needed)
  float flow(vec2 p, float t) {
    float v = 0.0;
    v += sin(p.x * 3.0 + t * 0.55);
    v += sin(p.y * 2.4 - t * 0.45);
    v += sin((p.x + p.y) * 1.9 + t * 0.35);
    v += sin(length(p) * 2.6 - t * 0.30);
    return v * 0.25;
  }

  void main() {
    // keep the field from stretching with the box aspect ratio
    float aspect = uRes.x / max(uRes.y, 1.0);
    vec2 uv = vUv;
    vec2 p = vec2((uv.x - 0.5) * aspect, uv.y - 0.5) * 2.6;

    // cursor bulge — a soft pull of the field toward the pointer
    vec2 m = vec2((uMouse.x - 0.5) * aspect, uMouse.y - 0.5) * 2.6;
    float d = distance(p, m);
    p += (p - m) * exp(-d * 1.8) * 0.45;

    float f = flow(p, uTime);
    f = smoothstep(-0.55, 0.65, f);

    vec3 col = mix(paper, clay, f);
    col = mix(col, graphite, f * f * 0.35);

    // a faint highlight ring around the cursor
    float ring = exp(-d * 2.2);
    col = mix(col, clay, ring * 0.18);

    // very light vignette so edges sit into the page
    float vig = smoothstep(1.25, 0.2, length((uv - 0.5) * vec2(aspect, 1.0)));
    col *= 0.94 + 0.06 * vig;

    gl_FragColor = vec4(col, 1.0);
  }
`;

export function LiquidHero({ className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const host = ref.current;
    if (!host) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let renderer, raf, ro, io, cleanupMouse;
    let cancelled = false;
    let visible = true;

    // target + smoothed mouse (0..1, y flipped to match uv)
    const target = { x: 0.5, y: 0.5 };
    const mouse = { x: 0.5, y: 0.5 };

    import("ogl")
      .then(({ Renderer, Program, Mesh, Triangle, Vec2 }) => {
        if (cancelled || !ref.current) return;

        renderer = new Renderer({
          alpha: false,
          antialias: false,
          dpr: Math.min(2, window.devicePixelRatio || 1),
        });
        const gl = renderer.gl;
        gl.canvas.className = "liquid-hero__canvas";
        host.appendChild(gl.canvas);

        const program = new Program(gl, {
          vertex: VERT,
          fragment: FRAG,
          uniforms: {
            uTime: { value: 0 },
            uMouse: { value: new Vec2(0.5, 0.5) },
            uRes: { value: new Vec2(1, 1) },
          },
        });
        const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

        const resize = () => {
          const w = host.clientWidth || 1;
          const h = host.clientHeight || 1;
          renderer.setSize(w, h);
          program.uniforms.uRes.value.set(w, h);
        };
        resize();
        ro = new ResizeObserver(resize);
        ro.observe(host);

        const onMove = (e) => {
          const r = host.getBoundingClientRect();
          target.x = (e.clientX - r.left) / r.width;
          target.y = 1 - (e.clientY - r.top) / r.height;
        };
        const onLeave = () => {
          target.x = 0.5;
          target.y = 0.5;
        };
        host.addEventListener("pointermove", onMove);
        host.addEventListener("pointerleave", onLeave);
        cleanupMouse = () => {
          host.removeEventListener("pointermove", onMove);
          host.removeEventListener("pointerleave", onLeave);
        };

        // Pause the loop when the hero scrolls out of view.
        io = new IntersectionObserver(
          ([entry]) => {
            visible = entry.isIntersecting;
            if (visible && !reduce && !raf) raf = requestAnimationFrame(render);
          },
          { threshold: 0 }
        );
        io.observe(host);

        const render = (t) => {
          raf = visible ? requestAnimationFrame(render) : 0;
          mouse.x += (target.x - mouse.x) * 0.06;
          mouse.y += (target.y - mouse.y) * 0.06;
          program.uniforms.uMouse.value.set(mouse.x, mouse.y);
          program.uniforms.uTime.value = (t || 0) * 0.001;
          renderer.render({ scene: mesh });
        };

        if (reduce) {
          // one static frame, no loop
          render(0);
        } else {
          raf = requestAnimationFrame(render);
        }
      })
      .catch(() => {
        // ogl/WebGL unavailable — the CSS gradient fallback stays visible
        if (host) host.classList.add("liquid-hero--fallback");
      });

    return () => {
      cancelled = true;
      if (raf) cancelAnimationFrame(raf);
      if (ro) ro.disconnect();
      if (io) io.disconnect();
      if (cleanupMouse) cleanupMouse();
      if (renderer) {
        const canvas = renderer.gl.canvas;
        const ext = renderer.gl.getExtension("WEBGL_lose_context");
        if (ext) ext.loseContext();
        if (canvas && canvas.parentNode) canvas.parentNode.removeChild(canvas);
      }
    };
  }, []);

  return <div ref={ref} className={["liquid-hero", className].filter(Boolean).join(" ")} aria-hidden="true" />;
}
