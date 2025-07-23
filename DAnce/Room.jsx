import React, { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, useAnimations, Environment } from "@react-three/drei";

const MODEL_URL = "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/models/gltf/LittlestTokyo.glb";

function AnimatedModel() {
  const group = useRef();
  const { scene, animations } = useGLTF(MODEL_URL);
  const { actions, mixer } = useAnimations(animations, group);

  useEffect(() => {
    Object.values(actions).forEach(action => action.play());
  }, [actions]);

  useFrame((_, delta) => {
    if (mixer) mixer.update(delta);
  });

  return (
    <primitive
      ref={group}
      object={scene}
      scale={1.2}
      position={[0, -8, 0]}
    />
  );
}

export default function KeyframeAnimationViewer() {
  return (
    <div className="w-full h-screen">
      <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Suspense fallback={null}>
          <AnimatedModel />
          <Environment preset="sunset" />
        </Suspense>
        <OrbitControls enableZoom enablePan />
      </Canvas>
    </div>
  );
}
