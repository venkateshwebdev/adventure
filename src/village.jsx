import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Village(props) {
  const { nodes, materials } = useGLTF("/3d/Andys Robin in Sherwood 3.gltf");
  return (
    <group {...props} dispose={null} position={[500,0.1,0]} scale={0.05}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh_0.geometry}
        material={materials.ROBIN_HOOD_ATLAS}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh_0_1.geometry}
        material={materials.ROBIN_HOOD_ATLAS}
      />
    </group>
  );
}

useGLTF.preload("/3d/Andys Robin in Sherwood 3.gltf");

