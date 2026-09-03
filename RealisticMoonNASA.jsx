"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

/**
 * RealisticMoonNASA
 * A WebGL moon built from ACTUAL NASA Lunar Reconnaissance Orbiter (LRO) data —
 * not procedurally guessed craters.
 *
 * - Color map: lroc_color_2k.jpg — real photographic mosaic from LRO's
 *   Wide Angle Camera (100,000+ images), NASA SVS "CGI Moon Kit".
 * - Displacement map: ldem_3_8bit.jpg — real elevation data from the LOLA
 *   laser altimeter, so every crater/mare/mountain sits at its true
 *   measured height (applied as displacement, not a fake bump).
 * - Source / credit: NASA Scientific Visualization Studio, CGI Moon Kit
 *   https://svs.gsfc.nasa.gov/4720  (public domain, NASA content)
 *
 * IMPORTANT — CORS / reliability:
 * Loading the textures directly from svs.gsfc.nasa.gov works in dev, but
 * for production you should download these two files and serve them from
 * your own /public folder to avoid depending on NASA's server uptime/CORS:
 *   https://svs.gsfc.nasa.gov/vis/a000000/a004700/a004720/lroc_color_2k.jpg
 *   https://svs.gsfc.nasa.gov/vis/a000000/a004700/a004720/ldem_3_8bit.jpg
 * Then just point COLOR_MAP_URL / DISPLACEMENT_MAP_URL at "/moon/..." below.
 * (Higher-res versions — 4k/8k/16k — are on the same NASA page if you want
 * more detail than the 2k maps used here.)
 *
 * Install:
 *   npm install three
 *
 * Usage in Next.js:
 *   import RealisticMoonNASA from "@/components/RealisticMoonNASA";
 *   <RealisticMoonNASA size={420} />
 */

const COLOR_MAP_URL =
  "https://svs.gsfc.nasa.gov/vis/a000000/a004700/a004720/lroc_color_2k.jpg";
const DISPLACEMENT_MAP_URL =
  "https://svs.gsfc.nasa.gov/vis/a000000/a004700/a004720/ldem_3_8bit.jpg";

export default function RealisticMoonNASA({ size = 420 }) {
  const mountRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 0, 6);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(size, size);
    mount.appendChild(renderer.domElement);

    const sun = new THREE.DirectionalLight(0xffffff, 2.4);
    sun.position.set(-4, 2, 3);
    scene.add(sun);
    scene.add(new THREE.AmbientLight(0x404050, 0.3));

    const geometry = new THREE.SphereGeometry(2, 256, 256);
    const material = new THREE.MeshStandardMaterial({
      roughness: 1,
      metalness: 0,
      color: 0x888888, // visible immediately while textures load
    });
    const moon = new THREE.Mesh(geometry, material);
    scene.add(moon);

    const loader = new THREE.TextureLoader();
    loader.crossOrigin = "anonymous";

    let loadedCount = 0;
    const onOneLoaded = () => {
      loadedCount += 1;
      if (loadedCount === 2) setLoading(false);
    };

    loader.load(
      COLOR_MAP_URL,
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        material.map = tex;
        material.color.set(0xffffff);
        material.needsUpdate = true;
        onOneLoaded();
      },
      undefined,
      () => setError("Couldn't load NASA color map (network/CORS).")
    );

    loader.load(
      DISPLACEMENT_MAP_URL,
      (tex) => {
        material.displacementMap = tex;
        material.displacementScale = 0.08; // real relief, subtle at this scale
        material.needsUpdate = true;
        onOneLoaded();
      },
      undefined,
      () => setError("Couldn't load NASA displacement map (network/CORS).")
    );

    let dragging = false;
    let prevX = 0;
    let prevY = 0;
    let rotY = 0;
    let rotX = 0;
    let autoRotate = 0;

    const onPointerDown = (e) => {
      dragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
    };
    const onPointerMove = (e) => {
      if (!dragging) return;
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;
      rotY += dx * 0.005;
      rotX = Math.max(-1, Math.min(1, rotX + dy * 0.005));
      prevX = e.clientX;
      prevY = e.clientY;
    };
    const onPointerUp = () => {
      dragging = false;
    };

    renderer.domElement.style.cursor = "grab";
    renderer.domElement.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    let frameId;
    const animate = () => {
      if (!dragging) autoRotate += 0.0015;
      moon.rotation.y = rotY + autoRotate;
      moon.rotation.x = rotX;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      geometry.dispose();
      material.dispose();
      material.map && material.map.dispose();
      material.displacementMap && material.displacementMap.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [size]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        padding: "2rem",
        background: "#05060a",
        gap: "0.5rem",
      }}
    >
      <div ref={mountRef} style={{ width: size, height: size }} />
      {loading && !error && (
        <span style={{ color: "#888", fontSize: 12 }}>Loading NASA moon data…</span>
      )}
      {error && <span style={{ color: "#e08080", fontSize: 12 }}>{error}</span>}
      <span style={{ color: "#666", fontSize: 11 }}>
        Imagery: NASA LRO / LROC WAC, elevation: LOLA (svs.gsfc.nasa.gov/4720)
      </span>
    </div>
  );
}
