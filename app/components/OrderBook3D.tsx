'use client';

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, GridHelper, AxesHelper, Text } from '@react-three/drei';
import useBinanceWebSocketClient from './useBinanceWebSocketClient';
import Bars from './Bars';
import PressureZones from './PressureZones.tsx'; // Adjust path
function Scene() {
  const { bids, asks } = useBinanceWebSocketClient();

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} />

      {/* Grid and Axes for orientation */}
      <gridHelper args={[40, 40]} />
      <axesHelper args={[10]} />

      {/* Axis Labels with black color */}
      <Text position={[11, 0, 0]} fontSize={0.5} color="black">
        X (Price Side)
      </Text>
      <Text position={[0, 11, 0]} fontSize={0.5} color="black">
        Y (Quantity)
      </Text>
      <Text position={[0, 0, 11]} fontSize={0.5} color="black">
        Z (Time)
      </Text>

      {/* Bids and Asks Bars */}
      <Bars bids={bids} asks={asks} />
      <PressureZones bids={bids} asks={asks} />
      <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
    </>
  );
}

export default function OrderBook3D() {
  return (
    <div className="w-full h-[600px]">
      <Canvas camera={{ position: [0, 15, 20], fov: 60 }}>
        <Scene />
      </Canvas>
    </div>
  );
}
