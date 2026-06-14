import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';

export default function GlucoseModel() {
  const groupRef = useRef<THREE.Group>(null);

  // Slowly rotate the molecule on frame updates
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.15;
    }
  });

  // Simple molecular model nodes (Carbon, Hydrogen, Oxygen)
  const atoms = [
    { pos: [0, 0, 0], color: '#00D4B4', size: 0.5 },       // Teal Carbon core
    { pos: [1.2, 0.5, 0.2], color: '#FFB347', size: 0.35 },   // Amber Oxygen
    { pos: [-1.2, -0.5, -0.2], color: '#EF4444', size: 0.35 }, // Red Oxygen
    { pos: [0.4, 1.0, -0.5], color: '#FFFFFF', size: 0.2 },    // White Hydrogen
    { pos: [-0.4, -1.0, 0.5], color: '#FFFFFF', size: 0.2 },   // White Hydrogen
    { pos: [0.8, -0.8, 0.8], color: '#00D4B4', size: 0.45 },   // Teal Carbon
    { pos: [-0.8, 0.8, -0.8], color: '#00D4B4', size: 0.45 },  // Teal Carbon
  ];

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1.8} color="#00D4B4" />
      <pointLight position={[-5, -5, -5]} intensity={1.0} color="#FFB347" />
      
      {/* Renders atoms */}
      {atoms.map((atom, idx) => (
        <mesh key={idx} position={atom.pos as [number, number, number]}>
          <sphereGeometry args={[atom.size, 32, 32]} />
          <meshStandardMaterial 
            color={atom.color} 
            roughness={0.1}
            metalness={0.2}
          />
        </mesh>
      ))}

      {/* Renders connecting bonds */}
      <mesh position={[0.6, 0.25, 0.1]} rotation={[0, 0, -0.5]}>
        <cylinderGeometry args={[0.06, 0.06, 1.4, 16]} />
        <meshStandardMaterial color="#ffffff" opacity={0.3} transparent />
      </mesh>
      <mesh position={[-0.6, -0.25, -0.1]} rotation={[0, 0, -0.5]}>
        <cylinderGeometry args={[0.06, 0.06, 1.4, 16]} />
        <meshStandardMaterial color="#ffffff" opacity={0.3} transparent />
      </mesh>
      
      <Stars radius={80} depth={30} count={1000} factor={4} saturation={0.5} fade speed={1} />
    </group>
  );
}
