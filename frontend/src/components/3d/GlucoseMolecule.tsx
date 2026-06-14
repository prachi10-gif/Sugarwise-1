import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, OrbitControls, Bloom, EffectComposer } from '@react-three/drei';
import * as THREE from 'three';

// Glucose Molecule geometry: 6 carbons in a ring + oxygens
const GlucoseMoleculeGeometry = () => {
  const groupRef = useRef<THREE.Group>(null);
  const dissolveRef = useRef(false);
  const particlesRef = useRef<THREE.Points>(null);

  const atoms = [
    // Carbon atoms (6 in ring)
    { pos: [1.2, 0, 0], color: '#00D4B4', size: 0.3, type: 'carbon' },
    { pos: [0.6, 1.04, 0], color: '#00D4B4', size: 0.3, type: 'carbon' },
    { pos: [-0.6, 1.04, 0], color: '#00D4B4', size: 0.3, type: 'carbon' },
    { pos: [-1.2, 0, 0], color: '#00D4B4', size: 0.3, type: 'carbon' },
    { pos: [-0.6, -1.04, 0], color: '#00D4B4', size: 0.3, type: 'carbon' },
    { pos: [0.6, -1.04, 0], color: '#00D4B4', size: 0.3, type: 'carbon' },
    // Oxygen atoms
    { pos: [0.6, 1.8, 0.5], color: '#FFB347', size: 0.25, type: 'oxygen' },
    { pos: [-1.5, 0.5, 0.5], color: '#FFB347', size: 0.25, type: 'oxygen' },
    { pos: [-0.6, -1.8, 0.5], color: '#FFB347', size: 0.25, type: 'oxygen' },
    // Hydrogen atoms (simplified)
    { pos: [2.0, 0.3, 0], color: '#FFFFFF', size: 0.15, type: 'hydrogen' },
    { pos: [1.0, 1.9, 0], color: '#FFFFFF', size: 0.15, type: 'hydrogen' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (groupRef.current) {
        const scrollY = window.scrollY;
        dissolveRef.current = scrollY > 100;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003;

      // Dissolve effect on scroll
      if (dissolveRef.current) {
        groupRef.current.children.forEach((child: THREE.Object3D) => {
          if (child instanceof THREE.Mesh) {
            child.material.opacity = Math.max(0, child.material.opacity - 0.01);
          }
        });
      }
    }
  });

  return (
    <group ref={groupRef}>
      {atoms.map((atom, idx) => (
        <mesh key={idx} position={atom.pos as THREE.Vector3Tuple}>
          <sphereGeometry args={[atom.size, 32, 32]} />
          <meshStandardMaterial
            color={atom.color}
            emissive={atom.color}
            emissiveIntensity={0.6}
            transparent
            opacity={1}
          />
        </mesh>
      ))}

      {/* Bonds between carbons */}
      <line>
        <bufferGeometry
          attach="geometry"
          {...{
            positions: new Float32Array([
              1.2, 0, 0, 0.6, 1.04, 0, 0.6, 1.04, 0, -0.6, 1.04, 0, -0.6, 1.04, 0, -1.2, 0, 0,
              -1.2, 0, 0, -0.6, -1.04, 0, -0.6, -1.04, 0, 0.6, -1.04, 0, 0.6, -1.04, 0, 1.2, 0, 0,
            ]),
          }}
        />
        <lineBasicMaterial color="#00D4B4" linewidth={2} transparent opacity={0.6} />
      </line>

      {/* Particles that float up when dissolving */}
      <Points ref={particlesRef} limit={1000} stride={3}>
        <PointMaterial sizeAttenuation size={0.1} color="#00D4B4" transparent opacity={0.6} />
      </Points>
    </group>
  );
};

interface GlucoseMoleculeProps {
  className?: string;
}

export const GlucoseMolecule: React.FC<GlucoseMoleculeProps> = ({ className = '' }) => {
  return (
    <div className={`w-full h-96 ${className}`}>
      <Canvas camera={{ position: [0, 0, 3] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, 10]} intensity={0.5} color="#00D4B4" />

        <GlucoseMoleculeGeometry />
        <OrbitControls autoRotate autoRotateSpeed={2} enableZoom={false} />

        <EffectComposer>
          <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} intensity={1.2} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default GlucoseMolecule;
