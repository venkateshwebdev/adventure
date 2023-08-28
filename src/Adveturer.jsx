import React, { useEffect, useRef, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { LoopOnce } from "three";

export function Model(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/3d/Adventurer.glb");
  const { actions } = useAnimations(animations, group);
  const [playAnimation, setPlayAnimation] = useState(null);
  const [characterPosition, setCharacterPosition] = useState([0, 0, 0]); // Initial position
  const { camera } = useThree();
  const [characterRotation, setCharacterRotation] = useState(0);

  const handleKeyPress = (e) => {
    if (e.key === "w" || e.key === "ArrowUp") {
      setPlayAnimation("Run");
      setCharacterPosition((prevPos) => [
        prevPos[0],
        prevPos[1],
        prevPos[2] - 0.3,
      ]);
      setCharacterRotation(Math.PI);
    } else if (e.key === "s" || e.key === "ArrowDown") {
      setPlayAnimation("Run");
      setCharacterPosition((prevPos) => [
        prevPos[0],
        prevPos[1],
        prevPos[2] + 0.3,
      ]);
      setCharacterRotation(Math.PI * 0);
    } else if (e.key === "a" || e.key === "ArrowRight") {
      setPlayAnimation("Run");
      setCharacterPosition((prevPos) => [
        prevPos[0]+0.3,
        prevPos[1],
        prevPos[2],
      ]);
      setCharacterRotation(Math.PI/2);
    } else if (e.key === "d" || e.key === "ArrowLeft") {
      setPlayAnimation("Run");
      setCharacterPosition((prevPos) => [
        prevPos[0]-0.3,
        prevPos[1],
        prevPos[2],
      ]);
      setCharacterRotation(-Math.PI/2);
    } else if (e.key === " ") {
      setPlayAnimation("null");
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      handleKeyPress(e);
      console.log(e);
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useFrame((state, delta) => {
    if (playAnimation) {
      actions[`CharacterArmature|${playAnimation}`].setLoop(true).play();
    }

    // Update camera's position to follow the character
    camera.position.set(
      characterPosition[0],
      characterPosition[1] + 2,
      characterPosition[2] + 10
    );
    camera.lookAt(
      characterPosition[0],
      characterPosition[1] - 5,
      characterPosition[2] - 300
    );
  });

  return (
    <group
      ref={group}
      {...props}
      dispose={null}
      position={characterPosition}
      rotation={[0, characterRotation, 0]}
    >
      <group name="Root_Scene" castShadow>
        <group name="RootNode" castShadow>
          <group
            name="CharacterArmature"
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <primitive object={nodes.Root} castShadow receiveShadow />
          </group>
          <group
            name="Adventurer_Feet"
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <skinnedMesh
              castShadow
              name="Adventurer_Feet_1"
              geometry={nodes.Adventurer_Feet_1.geometry}
              material={materials.Black}
              skeleton={nodes.Adventurer_Feet_1.skeleton}
            />
            <skinnedMesh
              castShadow
              name="Adventurer_Feet_2"
              geometry={nodes.Adventurer_Feet_2.geometry}
              material={materials.Grey}
              skeleton={nodes.Adventurer_Feet_2.skeleton}
            />
          </group>
          <group
            name="Adventurer_Legs"
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <skinnedMesh
              castShadow
              name="Adventurer_Legs_1"
              geometry={nodes.Adventurer_Legs_1.geometry}
              material={materials.Brown2}
              skeleton={nodes.Adventurer_Legs_1.skeleton}
            />
            <skinnedMesh
              castShadow
              name="Adventurer_Legs_2"
              geometry={nodes.Adventurer_Legs_2.geometry}
              material={materials.Brown}
              skeleton={nodes.Adventurer_Legs_2.skeleton}
            />
          </group>
          <group
            name="Adventurer_Body"
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <skinnedMesh
              castShadow
              name="Adventurer_Body_1"
              geometry={nodes.Adventurer_Body_1.geometry}
              material={materials.Green}
              skeleton={nodes.Adventurer_Body_1.skeleton}
            />
            <skinnedMesh
              castShadow
              name="Adventurer_Body_2"
              geometry={nodes.Adventurer_Body_2.geometry}
              material={materials.LightGreen}
              skeleton={nodes.Adventurer_Body_2.skeleton}
            />
            <skinnedMesh
              castShadow
              name="Adventurer_Body_3"
              geometry={nodes.Adventurer_Body_3.geometry}
              material={materials.Skin}
              skeleton={nodes.Adventurer_Body_3.skeleton}
            />
          </group>
          <group
            name="Adventurer_Head"
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <skinnedMesh
              castShadow
              name="Adventurer_Head_1"
              geometry={nodes.Adventurer_Head_1.geometry}
              material={materials.Skin}
              skeleton={nodes.Adventurer_Head_1.skeleton}
            />
            <skinnedMesh
              castShadow
              name="Adventurer_Head_2"
              geometry={nodes.Adventurer_Head_2.geometry}
              material={materials.Eyebrows}
              skeleton={nodes.Adventurer_Head_2.skeleton}
            />
            <skinnedMesh
              castShadow
              name="Adventurer_Head_3"
              geometry={nodes.Adventurer_Head_3.geometry}
              material={materials.Eye}
              skeleton={nodes.Adventurer_Head_3.skeleton}
            />
            <skinnedMesh
              castShadow
              name="Adventurer_Head_4"
              geometry={nodes.Adventurer_Head_4.geometry}
              material={materials.Hair}
              skeleton={nodes.Adventurer_Head_4.skeleton}
            />
          </group>
          <group
            name="Backpack"
            position={[0, 1.373, -0.117]}
            rotation={[-Math.PI / 2, 0, Math.PI]}
            scale={26.077}
          >
            <skinnedMesh
              castShadow
              name="Backpack_1"
              geometry={nodes.Backpack_1.geometry}
              material={materials.Brown}
              skeleton={nodes.Backpack_1.skeleton}
            />
            <skinnedMesh
              castShadow
              name="Backpack_2"
              geometry={nodes.Backpack_2.geometry}
              material={materials.Green}
              skeleton={nodes.Backpack_2.skeleton}
            />
            <skinnedMesh
              castShadow
              name="Backpack_3"
              geometry={nodes.Backpack_3.geometry}
              material={materials.LightGreen}
              skeleton={nodes.Backpack_3.skeleton}
            />
            <skinnedMesh
              castShadow
              name="Backpack_4"
              geometry={nodes.Backpack_4.geometry}
              material={materials.Gold}
              skeleton={nodes.Backpack_4.skeleton}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/3d/Adventurer.glb");
