
"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    if (!mountRef.current || typeof window === 'undefined') return;

    const currentMount = mountRef.current;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    // Renderer
    if (!rendererRef.current) {
      rendererRef.current = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      rendererRef.current.setSize(currentMount.clientWidth, currentMount.clientHeight);
      rendererRef.current.setPixelRatio(window.devicePixelRatio);
      currentMount.appendChild(rendererRef.current.domElement);
    }
    const renderer = rendererRef.current;


    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0x45B39D, 1, 100); // Teal accent
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Shield-like Geometry (Octahedron)
    const geometry = new THREE.OctahedronGeometry(1.5, 0); // radius, detail
    const material = new THREE.MeshStandardMaterial({ 
      color: 0x333333, // Dark authoritative grey
      metalness: 0.7,
      roughness: 0.3,
      flatShading: true,
    });
    const shield = new THREE.Mesh(geometry, material);
    scene.add(shield);

    // Wireframe for effect
    const wireframeGeometry = new THREE.WireframeGeometry(geometry);
    const wireframeMaterial = new THREE.LineBasicMaterial({ 
      color: 0x45B39D, // Teal accent
      linewidth: 1,
    });
    const wireframe = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);
    shield.add(wireframe);


    // Animation loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      shield.rotation.x += 0.005;
      shield.rotation.y += 0.005;
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!currentMount) return;
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (rendererRef.current && currentMount.contains(rendererRef.current.domElement)) {
         // currentMount.removeChild(rendererRef.current.domElement); // Avoid removing, just stop rendering
      }
      // Dispose Three.js objects if necessary
      geometry.dispose();
      material.dispose();
      wireframeGeometry.dispose();
      wireframeMaterial.dispose();
      scene.remove(shield);
      scene.remove(ambientLight);
      scene.remove(pointLight);
      // Note: Renderer disposal can be tricky with HMR. For simplicity, not fully disposing renderer here.
    };
  }, []);

  return <div ref={mountRef} className="w-full h-64 md:h-96" data-ai-hint="abstract security"></div>;
};

export default ThreeScene;
