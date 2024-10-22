import { Canvas, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const path = "/models/cube.glb";

function App() {
  const gltf = useLoader(GLTFLoader, path);

  return (
    <div className="w-full h-[100dvh] bg-gray-500">
      <Canvas>
        <ambientLight intensity={1} />
        <directionalLight position={[10, 10, 10]} intensity={1} />

        <primitive object={gltf.scene} rotation={[6.7, -Math.PI / 4, 0]} />
      </Canvas>
    </div>
  );
}

export default App;
