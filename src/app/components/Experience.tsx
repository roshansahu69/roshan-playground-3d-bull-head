import { Environment, useGLTF, OrbitControls } from '@react-three/drei'
import { useMemo, useRef, useEffect } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

export const Experience = ({ isInteractive }: { isInteractive: boolean }) => {
    return (
        <>
            {/* Ambient light for general visibility */}
            {/* <ambientLight intensity={0.7} /> */}

            {/* Directional light casting high-quality shadows */}
            <directionalLight
                castShadow
                position={[5, 8, 5]}
                intensity={1.5}
                shadow-mapSize={[1024, 1024]}
                shadow-bias={-0.0001}
            >
                <orthographicCamera attach="shadow-camera" args={[-6, 6, 6, -6, 0.1, 30]} />
            </directionalLight>

            {/* Additional fill light to highlight features */}
            <directionalLight position={[-5, 2, -2]} intensity={0.5} />

            <Environment preset="sunset" environmentIntensity={0.75} />

            {/* 3D Bull Head Model */}
            <BullHead isInteractive={isInteractive} />

            {/* Ground/Background plane to receive shadows */}
            <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.5, 0]}>
                <planeGeometry args={[100, 100]} />
                <shadowMaterial opacity={0.4} />
            </mesh>

            {isInteractive && (
                <OrbitControls
                    makeDefault
                    enableZoom={false}
                    enablePan={false}
                    enableRotate={true}
                />
            )}
        </>
    )
}

function BullHead({ isInteractive }: { isInteractive: boolean }) {
    const { scene } = useGLTF('/bull_head_2k.gltf/bull_head_2k.gltf');
    const groupRef = useRef<THREE.Group>(null);
    const scrollY = useRef(0);

    const defaultCameraPos = useMemo(() => new THREE.Vector3(0, 0, 8), []);
    const defaultCameraRot = useMemo(() => new THREE.Quaternion(), []);

    // Traverse and enable shadows on all child meshes
    useMemo(() => {
        scene.traverse((node) => {
            if ((node as THREE.Mesh).isMesh) {
                node.castShadow = true;
                node.receiveShadow = true;
            }
        });
    }, [scene]);

    useEffect(() => {
        const handleScroll = () => {
            scrollY.current = window.scrollY;
        };
        window.addEventListener('scroll', handleScroll);
        // Set initial scroll value
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isMobileRef = useRef(false);

    useEffect(() => {
        const handleResize = () => {
            isMobileRef.current = window.innerWidth <= 768;
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useFrame((state) => {
        if (!groupRef.current) return;

        // 1. Calculate target values based on scroll progress (in viewports)
        const progress = scrollY.current / window.innerHeight;
        const clampedProgress = Math.max(0, Math.min(3, progress));

        const lowerIndex = Math.floor(clampedProgress);
        const upperIndex = Math.min(3, Math.ceil(clampedProgress));
        const t = clampedProgress - lowerIndex;

        // Define target parameters for each segment
        // 0: Hero, 1: Info1, 2: Info2, 3: Details
        const desktopKeyframes = [
            { x: 0, y: -2.2, scale: 9 },    // Hero
            { x: -3.5, y: -3, scale: 15 }, // Info1
            { x: 3.5, y: -3, scale: 12 },  // Info2
            { x: 0, y: -2, scale: 10 }     // Details
        ];

        const mobileKeyframes = [
            { x: 0, y: -1.5, scale: 7 },    // Hero
            { x: -1.5, y: -2, scale: 10 }, // Info1
            { x: 1.5, y: -2, scale: 9 },  // Info2
            { x: 0, y: -1.5, scale: 9 }     // Details
        ];

        const keyframes = isMobileRef.current ? mobileKeyframes : desktopKeyframes;

        const targetX = THREE.MathUtils.lerp(keyframes[lowerIndex].x, keyframes[upperIndex].x, t);
        const targetY = THREE.MathUtils.lerp(keyframes[lowerIndex].y, keyframes[upperIndex].y, t);
        const targetScaleVal = THREE.MathUtils.lerp(keyframes[lowerIndex].scale, keyframes[upperIndex].scale, t);

        // 2. Add floating effect
        const time = state.clock.getElapsedTime();
        const floatY = Math.sin(time * 1.5) * 0.15;
        const finalTargetY = targetY + floatY;

        // Subtle floating rotation/tilt
        const floatRotX = Math.cos(time * 0.5) * 0.03;
        const floatRotY = Math.sin(time * 0.8) * 0.05;

        // 3. Smoothly interpolate (scrub) to target position and scale
        groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.08);
        groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, finalTargetY, 0.08);
        groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, 0, 0.08);

        const currentScale = groupRef.current.scale.x;
        const nextScale = THREE.MathUtils.lerp(currentScale, targetScaleVal, 0.08);
        groupRef.current.scale.set(nextScale, nextScale, nextScale);

        if (!isInteractive) {
            // Smoothly reset camera position & rotation when scrolling out of DetailsSection
            state.camera.position.lerp(defaultCameraPos, 0.08);
            state.camera.quaternion.slerp(defaultCameraRot, 0.08);

            // Apply smooth float rotation to the model
            groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, floatRotX, 0.08);
            groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, floatRotY, 0.08);
            groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, 0, 0.08);
        } else {
            // Under OrbitControls interaction: model floats, rotation keeps its float baseline
            groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, floatRotX, 0.08);
            groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, floatRotY, 0.08);
            groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, 0, 0.08);
        }
    });

    return (
        <group ref={groupRef}>
            <primitive object={scene} />
        </group>
    );
}
