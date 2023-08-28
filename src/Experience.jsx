import {OrbitControls,Sky,useGLTF,useAnimations,Scroll,useScroll, PivotControls, Environment, Text, Float, MeshReflectorMaterial, ScrollControls, SoftShadows, AccumulativeShadows, Stars, Cloud, Html} from "@react-three/drei"
import { useEffect, useRef, useState } from "react";
import {easing} from "maath"
import { useFrame } from "@react-three/fiber";
import { Model } from "./Adveturer";
import { Village } from "./village";
const Experience = () => {
  const [message,setMeassge] = useState(false)
  const [startGame,setStartGame] = useState(false)
  const handleClick =()=>{
    setMeassge(prev=>!prev)
  }
  return (
    <>
    {/* <fog attach="fog" args={["black",1,20]} />  */}
    <ambientLight intensity={1} />
    {/* <Stars  /> */}
    {/* <Environment preset="city" /> */}
    <directionalLight position={[1,5,5]} intensity={10} castShadow />
    <ScrollControls pages={3}>
      <Village />
    {startGame&&<Model  />}
    {!startGame&&
    <mesh position={[0,1,0]} onClick={()=>setStartGame(true)}>
    <Text position-y={1}>Click this box to start the Game</Text>
    <boxGeometry/>
    <meshNormalMaterial />
    </mesh>}
    {startGame&&
    <mesh>
    <Text position={[0,1,-100]} color={"red"}>Find the Yellow Text in this scene.</Text>
    <Text position={[0,1,-20]}>Go staright you will find a Red Text.</Text>
    <Text position={[-100,1,-100]} color={"yellow"}>Ok One more , on the Right you will Find The Pink Box.</Text> 
    <mesh position={[-130,1,-130]} scale={2} onClick={handleClick}>
      <Text style={{width:"300px"}} color="pink" position-y={1}>{!message?"Clik on this Block":"You Can go to the village Now find the village. Press the arrowDown button for 20 sec and go right"} </Text>
      <boxGeometry />
      <meshBasicMaterial color={"red"} />
      </mesh>
    </mesh>}

    <mesh position={[0,0,-1]} scale={2000} rotation-x={-Math.PI/2} receiveShadow>
      <planeGeometry/>
      <MeshReflectorMaterial color={"#000000"} receiveShadow/>
    </mesh>
    </ScrollControls>
    </>
  );
};

export default Experience;