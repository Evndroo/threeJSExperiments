import { Canvas } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

const path = "/models/cube.glb";

function App() {
  const { scene } = useGLTF(path);

  return (
    <div className="w-full h-[100dvh] bg-gray-500">
      <Canvas>
        <primitive object={scene} />
      </Canvas>
    </div>
  );
}

export default App;

useGLTF.preload(path);
