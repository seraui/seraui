"use client";
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// --- Main React Component ---
export default function App() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState({ visible: false, content: '', x: 0, y: 0 });
  const [popup, setPopup] = useState({ visible: false, src: '' });

  useEffect(() => {
    // --- Basic Scene Setup ---
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, currentMount.clientWidth / currentMount.clientHeight, 0.1, 2000);
    scene.add(camera);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    currentMount.appendChild(renderer.domElement);

    // --- Lights (Darker Theme) ---
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
    keyLight.position.set(5, 2, 8);
    camera.add(keyLight);
    const fillLight = new THREE.AmbientLight(0x4466aa, 0.15);
    scene.add(fillLight);

    // --- Background Stars ---
    const starGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(1000 * 3);
    for (let i = 0; i < 1000; i++) {
      const r = 1200 + Math.random() * 800;
      const theta = Math.acos(2 * Math.random() - 1);
      const phi = Math.random() * Math.PI * 2;
      positions[i * 3 + 0] = r * Math.sin(theta) * Math.cos(phi);
      positions[i * 3 + 1] = r * Math.cos(theta);
      positions[i * 3 + 2] = r * Math.sin(theta) * Math.sin(phi);
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({ size: 2, sizeAttenuation: true, transparent: true, opacity: 0.75 }));
    scene.add(stars);

    // --- Globe and Glow (Darker Theme) ---
    const RADIUS = 200;
    const globeMat = new THREE.MeshStandardMaterial({ color: 0x1e3a8a, roughness: 0.9, metalness: 0.05, emissive: 0x00102a, emissiveIntensity: 0.4 });
    const globe = new THREE.Mesh(new THREE.SphereGeometry(RADIUS, 64, 64), globeMat);
    scene.add(globe);

    const glowGeo = new THREE.SphereGeometry(RADIUS * 1.05, 64, 64);
    const glowMat = new THREE.ShaderMaterial({
      uniforms: { glowColor: { value: new THREE.Color(0x3b82f6) } },
      vertexShader: `
        varying float vIntensity;
        void main() {
          vec3 vNormal = normalize(normalMatrix * normal);
          vec3 vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
          vec3 vViewDir = normalize(-vPosition);
          vIntensity = pow(0.4 - dot(vNormal, vViewDir), 4.0);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 glowColor;
        varying float vIntensity;
        void main() {
          gl_FragColor = vec4(glowColor, 1.0) * vIntensity;
        }
      `,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true
    });
    const glow = new THREE.Mesh(glowGeo, glowMat);
    scene.add(glow);

    // --- Photo Patches (New Reliable Anime Photos) ---
    const photoGroup = new THREE.Group();
    scene.add(photoGroup);

    const textureLoader = new THREE.TextureLoader();
    const imageUrls = [
      'https://images.pexels.com/photos/209802/pexels-photo-209802.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/1638324/pexels-photo-1638324.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/593158/pexels-photo-593158.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/2448749/pexels-photo-2448749.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/2860807/pexels-photo-2860807.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/269923/pexels-photo-269923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/311039/pexels-photo-311039.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/3224164/pexels-photo-3224164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/2229734/pexels-photo-2229734.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/2095393/pexels-photo-2095393.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/1037993/pexels-photo-1037993.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/1037995/pexels-photo-1037995.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/259915/pexels-photo-259915.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ];

    const patchSize = 34, gap = 2;
    let imageIndex = 0;
    for (let lat = -90; lat <= 90; lat += (patchSize + gap)) {
      for (let lon = -180; lon <= 180; lon += (patchSize + gap)) {
        const tex = textureLoader.load(imageUrls[imageIndex % imageUrls.length]);
        tex.colorSpace = THREE.SRGBColorSpace;
        const patchSizeRad = THREE.MathUtils.degToRad(patchSize);
        const thetaStart = THREE.MathUtils.degToRad(lon + 180 - (patchSize / 2));
        const phiStart = THREE.MathUtils.degToRad(90 - lat - (patchSize / 2));
        const patchGeo = new THREE.SphereGeometry(RADIUS + 0.5, 32, 32, thetaStart, patchSizeRad, phiStart, patchSizeRad);
        const patchMat = new THREE.MeshStandardMaterial({ map: tex, transparent: true, roughness: 0.8, metalness: 0.1, emissive: new THREE.Color(0xffffff), emissiveIntensity: 0 });
        const patch = new THREE.Mesh(patchGeo, patchMat);
        patch.userData = { title: `Location (${lat.toFixed(0)}, ${lon.toFixed(0)})`, url: imageUrls[imageIndex % imageUrls.length] };
        photoGroup.add(patch);
        imageIndex++;
      }
    }

    // Set initial camera position before creating controls to avoid zero distance issues
    camera.position.set(0, 0, RADIUS * 3); // Arbitrary initial distance greater than 0

    // --- Controls ---
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.6;

    // --- Interaction Logic ---
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const pointerDownPos = new THREE.Vector2();
    let hovered: THREE.Object3D | null = null;
    let spinning = true;

    const getIntersectedPatch = (event: React.PointerEvent<HTMLDivElement>) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(photoGroup.children, false);
      return intersects.length > 0 ? intersects[0].object : null;
    };

    // --- Event Listeners ---
    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
      if (e.buttons > 0) return;
      const patch = getIntersectedPatch(e);
      hovered = patch;
      if (patch) {
        setTooltip({ visible: true, content: patch.userData.title, x: e.clientX, y: e.clientY });
        currentMount.style.cursor = 'pointer';
      } else {
        setTooltip({ visible: false, content: '', x: 0, y: 0 });
        currentMount.style.cursor = 'default';
      }
    };

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
      controls.autoRotate = false;
      pointerDownPos.set(e.clientX, e.clientY);
    };

    const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
      if (spinning) controls.autoRotate = true;
      if (pointerDownPos.distanceTo(new THREE.Vector2(e.clientX, e.clientY)) < 5) {
        const clickedPatch = getIntersectedPatch(e);
        if (clickedPatch) {
          setPopup({ visible: true, src: clickedPatch.userData.url });
        }
      }
    };

    // --- UPDATED: Robust Responsive Sizing and Centering ---
    const handleResize = () => {
      const width = currentMount.clientWidth;
      const height = currentMount.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      const fov = camera.fov * (Math.PI / 180);
      const globeVisibleSize = RADIUS * 2.1; // Diameter + glow margin
      const distanceToFitHeight = globeVisibleSize / (2 * Math.tan(fov / 2));
      const distanceToFitWidth = distanceToFitHeight / camera.aspect;
      const distance = Math.max(distanceToFitHeight, distanceToFitWidth);
      camera.position.set(0, 0, distance);
      controls.maxDistance = distance * 2;
      controls.minDistance = distance / 1.5;
      camera.updateProjectionMatrix();
    };

    handleResize();

    const toggleSpinBtn = document.getElementById('toggleSpin');
    const recenterBtn = document.getElementById('recenter');

    const toggleSpinHandler = () => {
      spinning = !spinning;
      controls.autoRotate = spinning;
      if (toggleSpinBtn) {
        toggleSpinBtn.textContent = spinning ? 'Pause Spin' : 'Resume Spin';
      }
    };

    const recenterHandler = () => {
      camera.position.set(0, 0, 0); // Reset for calculation
      controls.target.set(0, 0, 0);
      handleResize(); // Recalculate correct centered position
      controls.update();
    };

    if (toggleSpinBtn) toggleSpinBtn.addEventListener('click', toggleSpinHandler);
    if (recenterBtn) recenterBtn.addEventListener('click', recenterHandler);

    // Use React's event system for the canvas
    currentMount.addEventListener('pointermove', handlePointerMove as any);
    currentMount.addEventListener('pointerdown', handlePointerDown as any);
    currentMount.addEventListener('pointerup', handlePointerUp as any);
    window.addEventListener('resize', handleResize);

    // --- Animation Loop ---
    const clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      const delta = clock.getDelta();
      stars.rotation.y += 0.0001;
      controls.update();
      photoGroup.children.forEach(patch => {
        const targetScale = patch === hovered ? 1.08 : 1.0;
        const targetIntensity = patch === hovered ? 0.4 : 0;
        if (patch instanceof THREE.Mesh && patch.material instanceof THREE.MeshStandardMaterial) {
          patch.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 8);
          patch.material.emissiveIntensity = THREE.MathUtils.lerp(patch.material.emissiveIntensity, targetIntensity, delta * 8);
        }
      });
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (toggleSpinBtn) toggleSpinBtn.removeEventListener('click', toggleSpinHandler);
      if (recenterBtn) recenterBtn.removeEventListener('click', recenterHandler);
      currentMount.removeEventListener('pointermove', handlePointerMove as any);
      currentMount.removeEventListener('pointerdown', handlePointerDown as any);
      currentMount.removeEventListener('pointerup', handlePointerUp as any);
      if (renderer.domElement.parentElement === currentMount) {
        currentMount.removeChild(renderer.domElement);
      }
      scene.traverse(object => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
    };
  }, []);

  return (
    <div className="relative h-[800px] w-[830px] overflow-hidden bg-[radial-gradient(1200px_700px_at_70%_20%,#0f172a,#0b1020_55%)] text-[#dfe7ff]">
      <div ref={mountRef} className="h-full w-full " />
      {/* UI Elements */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-lg font-bold tracking-wider text-white/90 shadow-2xl">
        3D Photo Globe — drag to explore
      </div>
      <div className="absolute bottom-5 inset-x-0 flex justify-center gap-3">
        <button id="toggleSpin" className="px-4 py-2 rounded-full backdrop-blur-sm border border-white/10 bg-white/5 hover:-translate-y-0.5 hover:bg-white/10 transition-transform">
          Pause Spin
        </button>
        <button id="recenter" className="px-4 py-2 rounded-full backdrop-blur-sm border border-white/10 bg-white/5 hover:-translate-y-0.5 hover:bg-white/10 transition-transform">
          Re-center
        </button>
        <span className="px-3 py-2 text-sm rounded-full backdrop-blur-sm border border-white/10 bg-white/5 opacity-80">
          Scroll: zoom · Click photo: open
        </span>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_55%_at_50%_50%,rgba(0,0,0,0)_60%,rgba(0,0,0,0.35)_100%)] mix-blend-multiply" />
      {tooltip.visible && (
        <div
          className="absolute pointer-events-none whitespace-nowrap rounded-md border border-white/10 bg-gray-900/80 px-2 py-1 text-xs"
          style={{ top: tooltip.y, left: tooltip.x, transform: 'translate(-50%, -120%)' }}
        >
          {tooltip.content}
        </div>
      )}
      {popup.visible && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/70 backdrop-blur-md"
          onClick={() => setPopup({ visible: false, src: '' })}
        >
          <div className="relative rounded-xl bg-white p-2 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <img src={popup.src} alt="Popup" className="block max-h-[85vh] max-w-[90vw] rounded-lg" />
            <button
              onClick={() => setPopup({ visible: false, src: '' })}
              className="absolute -top-4 -right-4 grid h-8 w-8 place-items-center rounded-full bg-white text-2xl font-bold text-gray-800 shadow-lg"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
