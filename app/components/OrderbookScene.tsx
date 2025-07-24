
'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls} from '@react-three/drei'

export default function OrderbookScene() {
  return (
    <Canvas camera={{ position: [0, 10, 40], fov: 50 }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls />
      {/* 3D Orderbook bars will go here */}
    </Canvas>
  )
}
