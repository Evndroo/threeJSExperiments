import { RotatingModel } from "./components/RotationModel";

function App() {
  return (
    <div className="w-full h-[100dvh] bg-gray-400">
      <RotatingModel gltfPath="/models/barbarian_optimized.glb" />
    </div>
  );
}

export default App;
