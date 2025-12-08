import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Particles() {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particlesCount = 150;
  
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    
    // Warm golden/amber color palette
    const colorPalette = [
      new THREE.Color('#d4a574'), // Golden amber
      new THREE.Color('#c19660'), // Honey
      new THREE.Color('#e8d5b7'), // Cream
      new THREE.Color('#8b7355'), // Earth brown
      new THREE.Color('#dcc9a3'), // Light gold
    ];
    
    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 5;
      
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    
    return [positions, colors];
  }, []);
  
  useFrame((state) => {
    if (!particlesRef.current) return;
    
    const time = state.clock.getElapsedTime();
    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < particlesCount; i++) {
      const i3 = i * 3;
      positions[i3 + 1] += Math.sin(time * 0.3 + i * 0.1) * 0.002;
      positions[i3] += Math.cos(time * 0.2 + i * 0.05) * 0.001;
    }
    
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
    particlesRef.current.rotation.y = time * 0.02;
  });
  
  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particlesCount}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function FloatingOrb({ position, scale, color }: { position: [number, number, number]; scale: number; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialY = position[1];
  
  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    meshRef.current.position.y = initialY + Math.sin(time * 0.5 + position[0]) * 0.3;
    meshRef.current.rotation.x = time * 0.1;
    meshRef.current.rotation.z = time * 0.15;
  });
  
  return (
    <mesh ref={meshRef} position={position}>
      <icosahedronGeometry args={[scale, 1]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.15}
        wireframe
      />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <Particles />
      <FloatingOrb position={[-3, 1, -2]} scale={1.2} color="#d4a574" />
      <FloatingOrb position={[3, -1, -3]} scale={0.8} color="#c19660" />
      <FloatingOrb position={[0, 2, -4]} scale={1} color="#e8d5b7" />
    </>
  );
}

// Fallback for mobile/low-powered devices
function CSSFallback() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute w-64 h-64 rounded-full bg-primary/5 animate-float -top-20 -left-20" />
      <div className="absolute w-48 h-48 rounded-full bg-honey/10 animate-float top-1/3 right-10" style={{ animationDelay: '-2s' }} />
      <div className="absolute w-32 h-32 rounded-full bg-secondary/10 animate-float bottom-20 left-1/4" style={{ animationDelay: '-4s' }} />
    </div>
  );
}

export function ThreeBackground() {
  // Check for reduced motion preference and mobile
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  
  if (prefersReducedMotion || isMobile) {
    return <CSSFallback />;
  }
  
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Suspense fallback={<CSSFallback />}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 60 }}
          style={{ background: 'transparent' }}
          dpr={[1, 1.5]}
          performance={{ min: 0.5 }}
        >
          <Scene />
        </Canvas>
      </Suspense>
    </div>
  );
}
