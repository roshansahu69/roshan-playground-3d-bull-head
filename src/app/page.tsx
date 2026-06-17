'use client'
import { Environment, OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from 'three'
import { Canvas } from "@react-three/fiber";
import styles from "./page.module.css";
import { useEffect } from "react";

export default function Home() {
  return (
    <div className={styles.page}>
      <Canvas>
        <color attach="background" args={['#a63a08']} />
        <Environment preset="sunset" environmentIntensity={1} />
        <ambientLight />
        {/* <directionalLight position={[10, 10, 5]} intensity={0.5} /> */}

        <BullHead />
        <OrbitControls />
      </Canvas>
    </div>
  );
}

function BullHead() {
  // const { scene } = useGLTF('/bull_head/bull_head_1k.gltf');
  const { scene } = useGLTF('/bull_head_2k.gltf/bull_head_2k.gltf');
  return <primitive object={scene} scale={13} />

}
