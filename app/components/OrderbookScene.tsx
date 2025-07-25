
'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls} from '@react-three/drei'
import {Suspense} from 'react'
import useBinanceWebSocketClient from './useBinanceWebSocketClient'
 import Bars from './Bars'
import PressureZones from './PressureZones' // ✅ Adjust path as needed

 
export default function OrderbookScene() {
    const { bids, asks } = useBinanceWebSocketClient('btcusdt', 20)
  return (
    <Canvas camera={{ position: [0, 50, 100], fov: 75 }}>
      <ambientLight intensity={0.5} />
<directionalLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[10, 10, 10]} />
      <Bars bids={bids} asks={asks} />
      <PressureZones bids={bids} asks={asks} />
      <OrbitControls />
    </Canvas>
    
  )
}
