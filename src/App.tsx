import { Canvas } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

const path = "/models/cube.glb";

function App() {
  const { scene } = useGLTF(path);

  return (
    <div className="w-full h-[100dvh] bg-gray-500">
      <Canvas>
        <ambientLight intensity={1} />
        <directionalLight position={[10, 10, 10]} intensity={1} />

        <primitive object={scene} rotation={[6.7, -Math.PI / 4, 0]} />
      </Canvas>
    </div>
  );
}

export default App;

useGLTF.preload(path);
