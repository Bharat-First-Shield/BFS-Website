
"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const shieldRef = useRef<THREE.Mesh | null>(null);
  const starsRef = useRef<THREE.Points | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!mountRef.current || typeof window === 'undefined') return;

    const currentMount = mountRef.current;

    // Scene
    const scene = sceneRef.current || new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x05070d); // Deep space blue, matching CSS

    // Camera
    const camera = cameraRef.current || new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    cameraRef.current = camera;
    camera.position.z = 5;

    // Renderer
    if (!rendererRef.current) {
      rendererRef.current = new THREE.WebGLRenderer({ antialias: true }); // Removed alpha: true
      rendererRef.current.setSize(currentMount.clientWidth, currentMount.clientHeight);
      rendererRef.current.setPixelRatio(window.devicePixelRatio);
      currentMount.appendChild(rendererRef.current.domElement);
    }
    const renderer = rendererRef.current;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xf2991c, 1, 100); // Vibrant orange accent
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Shield-like Geometry (Octahedron)
    let shield: THREE.Mesh;
    if (!shieldRef.current) {
      const geometry = new THREE.OctahedronGeometry(1.5, 0);
      const material = new THREE.MeshStandardMaterial({
        color: 0x333333,
        metalness: 0.7,
        roughness: 0.3,
        flatShading: true,
      });
      shield = new THREE.Mesh(geometry, material);
      shieldRef.current = shield;

      const wireframeGeometry = new THREE.WireframeGeometry(geometry);
      const wireframeMaterial = new THREE.LineBasicMaterial({
        color: 0xf2991c,
        linewidth: 1,
      });
      const wireframe = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);
      shield.add(wireframe);
      scene.add(shield);
    } else {
      shield = shieldRef.current;
      if (!scene.children.includes(shield)) {
        scene.add(shield);
      }
    }
    
    // Starfield
    let stars: THREE.Points;
    if (!starsRef.current) {
      const starVertices = [];
      const outerRadius = 200; // Increased radius for more depth
      const numStars = 3000;
      for (let i = 0; i < numStars; i++) {
          const u = Math.random();
          const v = Math.random();
          const theta = 2 * Math.PI * u;
          const phi = Math.acos(2 * v - 1);
          const r = THREE.MathUtils.randFloat(30, outerRadius); // Stars start further out

          const x = r * Math.sin(phi) * Math.cos(theta);
          const y = r * Math.sin(phi) * Math.sin(theta);
          const z = r * Math.cos(phi);
          starVertices.push(x, y, z);
      }
      const starGeometry = new THREE.BufferGeometry();
      starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
      const starMaterial = new THREE.PointsMaterial({
        color: 0xbbbbbb,
        size: 0.2, // Star size
        sizeAttenuation: true
      });
      stars = new THREE.Points(starGeometry, starMaterial);
      starsRef.current = stars;
      scene.add(stars);
    } else {
        stars = starsRef.current;
        if(!scene.children.includes(stars)) {
            scene.add(stars);
        }
    }


    // Animation loop
    const animate = () => {
      animationFrameIdRef.current = requestAnimationFrame(animate);
      shield.rotation.x += 0.005;
      shield.rotation.y += 0.005;
      if (starsRef.current) { // Optional: make stars slowly rotate or twinkle
         // starsRef.current.rotation.y += 0.0001;
      }
      renderer.render(scene, camera);
    };
    
    // Cancel previous animation frame if any
    if (animationFrameIdRef.current) {
      cancelAnimationFrame(animationFrameIdRef.current);
    }
    animate();

    // Handle resize
    const handleResize = () => {
      if (!currentMount || !cameraRef.current || !rendererRef.current) return;
      cameraRef.current.aspect = currentMount.clientWidth / currentMount.clientHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
        animationFrameIdRef.current = null;
      }
      
      // Dispose geometries and materials of shield if they exist and this is the last unmount
      // This simple example doesn't track shared resources for full disposal,
      // assuming shieldRef and starsRef will be reused or recreated properly.
      // For more complex apps, manage geometry/material disposal carefully.
      // scene.remove(shield);
      // scene.remove(stars);
      // scene.remove(ambientLight);
      // scene.remove(pointLight);
      // if (shieldRef.current) {
      //   shieldRef.current.geometry.dispose();
      //   (shieldRef.current.material as THREE.Material).dispose();
      //   if (shieldRef.current.children[0]) { // wireframe
      //     (shieldRef.current.children[0] as THREE.LineSegments).geometry.dispose();
      //     ((shieldRef.current.children[0] as THREE.LineSegments).material as THREE.Material).dispose();
      //   }
      // }
      // if (starsRef.current) {
      //   starsRef.current.geometry.dispose();
      //   (starsRef.current.material as THREE.Material).dispose();
      // }
      // rendererRef.current?.dispose(); // Dispose renderer if it's truly the end of its life
    };
  }, []); // Empty dependency array, runs once on mount and cleans up on unmount

  // Extended cleanup for development strict mode or fast refresh
  useEffect(() => {
    return () => {
        if (animationFrameIdRef.current) {
            cancelAnimationFrame(animationFrameIdRef.current);
        }
        if (rendererRef.current && mountRef.current?.contains(rendererRef.current.domElement)) {
            // mountRef.current.removeChild(rendererRef.current.domElement); // Let Next.js handle DOM tree
        }
        // Consider full disposal if objects are not meant to persist across HMR
        // sceneRef.current?.clear(); // Clears all children, lights, etc.
        // rendererRef.current?.dispose();
        // rendererRef.current = null; 
        // etc for other refs.
    }
  }, []);


  return <div ref={mountRef} className="w-full h-64 md:h-96" data-ai-hint="abstract security"></div>;
};

export default ThreeScene;
