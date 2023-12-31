import {OrbitControls,Sky,useGLTF,useAnimations,Scroll,useScroll, PivotControls, Environment, Text, Float, MeshReflectorMaterial, ScrollControls, SoftShadows, AccumulativeShadows, Stars, Cloud, Html, useTexture} from "@react-three/drei"
import { useEffect, useRef, useState } from "react";
import {easing} from "maath"
import { useFrame } from "@react-three/fiber";
import { Model } from "./Adveturer";
import { Village } from "./village";
import { Physics, RigidBody, CuboidCollider } from "@react-three/rapier";
const Experience = () => {
  const [message,setMeassge] = useState(false)
  const [startGame,setStartGame] = useState(false)
  const [background,setbackground] = useState(true)
  const handleClick =()=>{
    setMeassge(prev=>!prev)
  }
  const aoTexture = useTexture("/3d/textures/park_sand_ao_1k.png");
  const disp = useTexture("/3d/textures/park_sand_disp_1k.png")
  const roughMap = useTexture("/3d/textures/park_sand_rough_1k.png")
  return (
    <>
    {/* <fog attach="fog" args={["black",1,20]} />  */}
    <ambientLight intensity={1} />
    <Sky  />
    <directionalLight position={[1,5,5]} intensity={10} castShadow />
    <Village />
    <Model  />
    {!startGame&&
    <mesh position={[0,1,0]} onClick={()=>setStartGame(true)} onPointerMove={()=>setbackground(false)}>
    <Text position-y={1} color={"black"}>Click this box to start the Game</Text>
    {/* <Html center style={{fontSize:"90px",width:"1000px"}} position-y={1}>Click this box to start the Game</Html> */}
    <boxGeometry/>
    <meshNormalMaterial />
    </mesh>}
    {startGame&&
    <mesh>
    <Text position={[0,1,-100]} color={"red"}>Find the Green Text in this scene.</Text>
    {/* <Html position={[0,1,-100]} center style={{fontSize:"90px",width:"1000px"}} color={"red"}>Find the Yellow Text in this scene.</Html> */}
    <Text position={[0,1,-20]} color={"blue"}>Go staright you will find a Red Text.</Text>
    {/* <Html position={[0,1,-20]} center style={{fontSize:"90px",width:"1000px",color:"white"}}>Go staright you will find a Red Text.</Html> */}
    <Text position={[-100,1,-100]} color={"Green"}>Ok One more , on the Right you will Find The Pink Box.</Text> 
    {/* <Html position={[-100,1,-100]} center style={{fontSize:"90px",width:"1000px",color:"yellow"}}>Ok One more , on the Right you will Find The Pink Box.</Html>  */}
    <mesh position={[-130,1,-130]} scale={2} onClick={handleClick}>
      <Text style={{width:"300px"}} color="pink" position-y={1}>{!message?"Clik on this Block":"You Can go to the village Now find the village. Press the arrowDown button for 20 sec and go right"} </Text>
      {/* <Html center style={{fontSize:"90px",width:"1000px",color:"pink"}} position-y={1}>{!message?"Clik on this Block":"You Can go to the village Now find the village. Press the arrowDown button for 20 sec and go right"} </Html> */}
      <boxGeometry />
      <meshBasicMaterial color={"red"} />
      </mesh>
    <CuboidCollider position={[0, -2, 0]} args={[20, 0.5, 20]} />
    </mesh>}
    <RigidBody type="fixed" >
    <mesh position={[0,-2,-1]} scale={[1300,1300,1]}  rotation-x={-Math.PI/2} receiveShadow>
      <boxGeometry receiveShadow/>
      <meshStandardMaterial receiveShadow color={"#C2B280"}  map={aoTexture} roughnessMap={roughMap} />
    </mesh> 
    </RigidBody>
    </>
  );
};

export default Experience;
