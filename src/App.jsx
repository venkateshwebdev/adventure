import {Canvas} from "@react-three/fiber"
import Experience from "./Experience";
import { OrbitControls } from "@react-three/drei";
import { useEffect, useRef } from "react";
const App = () => {
  return (
    <Canvas shadows camera={{position:[0,2,5]}}> 
    <OrbitControls makeDefault /> 
      <Experience />
    </Canvas>
  );
}
 
export default App;