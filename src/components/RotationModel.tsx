import { Canvas, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";

interface Props {
  gltfPath: string;
}

export function RotatingModel({ gltfPath }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const gltf = useLoader(GLTFLoader, gltfPath);
  const meshRef = useRef<THREE.Group | null>(null);

  const initialRotation = useRef({ x: Math.PI / 7.5, y: -0.2, z: 0 });
  const [dragTimeout, setDragTimeout] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [initialDragPosition, setInitialDragPosition] = useState({
    x: 0,
    y: 0,
  });

  const resetRotation = () => {
    if (meshRef.current) {
      meshRef.current.rotation.set(
        initialRotation.current.x,
        initialRotation.current.y,
        initialRotation.current.z
      );
    }
  };

  const handlePointerDown = (event: React.PointerEvent) => {
    setIsDragging(true);
    setInitialDragPosition({ x: event.clientX, y: event.clientY });

    if (dragTimeout) {
      clearTimeout(dragTimeout);
      setDragTimeout(null);
    }
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    const timeout = setTimeout(() => {
      resetRotation();
    }, 1500);

    setDragTimeout(timeout);
  };

  const handlePointerMove = (event: React.PointerEvent) => {
    if (isDragging && meshRef.current) {
      const deltaX = event.clientX - initialDragPosition.x;
      const deltaY = event.clientY - initialDragPosition.y;

      meshRef.current.rotation.y += deltaX * 0.01;
      meshRef.current.rotation.x += deltaY * 0.01;

      setInitialDragPosition({ x: event.clientX, y: event.clientY });
    }
  };

  useEffect(() => {
    return () => {
      if (dragTimeout) {
        clearTimeout(dragTimeout);
      }
    };
  }, [dragTimeout]);

  return (
    <div
      className={`h-full w-full relative ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      } ${isLoading ? "cursor-default" : ""}`}
    >
      <Canvas
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerMove={handlePointerMove}
      >
        <ambientLight intensity={1} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        <primitive
          ref={meshRef}
          object={gltf.scene}
          rotation={initialRotation.current}
          onUpdate={() => setIsLoading(false)}
        />
      </Canvas>

      {isLoading ? (
        <div className="h-full flex items-center justify-center absolute top-0 left-0 w-full bg-gray-400">
          <h1 className="text-center text-2xl w-full type-ellipsis">
            Carregando
          </h1>
        </div>
      ) : null}
    </div>
  );
}
