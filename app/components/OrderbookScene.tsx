
'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls} from '@react-three/drei'
import {Suspense} from 'react'

export default function OrderbookScene() {
  return (
     <div className="w-full h-[600px] bg-black">
      <Canvas camera={{ position: [0, 20, 40], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        {/* console.log('LIVE bids:', bids.slice(0,5), 'asks:', asks.slice(0,5)) */}

        <Suspense fallback={null}>
          <OrbitControls />
          {/* 3D Bars will go here */}
        </Suspense>
      </Canvas>
    </div>
  )
}
