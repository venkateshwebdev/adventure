import {Canvas} from "@react-three/fiber"
import Experience from "./Experience";
import { OrbitControls } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { Physics, RigidBody } from "@react-three/rapier";
import { VRButton, XR } from "@react-three/xr";
const App = () => {
  return (
    <>
    <div style={{height:"100vh",width:"100vh",position:"absolute",zIndex:100}}></div>
    <VRButton />
    <Canvas shadows camera={{position:[0,2,5]}} style={{backgroundColor:"black"}}>
      <XR>
      <Physics debug>
        <OrbitControls makeDefault /> 
        <Experience />
      </Physics>
      </XR>
    </Canvas>
    </>
  );
}
 
export default App;