import React from 'react'
import { Order } from './useBinanceWebSocketClient'

type BarsProps = {
  bids: Order[]
  asks: Order[]
}

const Bars = ({ bids, asks }: BarsProps) => {
  const barWidth = 0.8
  const gap = 1

  return (
    <group>
      {/* Bids - Green */}
      {bids.map((order, i) => (
        <mesh key={`bid-${i}`} position={[i * gap, order.quantity / 2, 0]}>
          <boxGeometry args={[barWidth, order.quantity, barWidth]} />
          <meshStandardMaterial color="green" />
        </mesh>
      ))}

      {/* Asks - Red */}
      {asks.map((order, i) => (
        <mesh key={`ask-${i}`} position={[i * gap, order.quantity / 2, -5]}>
          <boxGeometry args={[barWidth, order.quantity, barWidth]} />
          <meshStandardMaterial color="red" />
        </mesh>
      ))}
    </group>
  )
}

export default Bars
