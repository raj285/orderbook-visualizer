import React from 'react'
import { Order } from './useBinanceWebSocketClient'
import { Text } from '@react-three/drei'

type BarsProps = {
  bids: Order[]
  asks: Order[]
}

const Bars = ({ bids, asks }: BarsProps) => {
  const barWidth = 0.8
  const gap = 1
  const scaleFactor = 2
  const now = new Date().toLocaleTimeString()

  return (
    <group>
      {/* Bids - Green */}
      {bids.map((order, i) => {
        const x = -5
        const y = (order.quantity / scaleFactor) / 2
        const z = i * gap

        return (
          <group key={`bid-${i}`}>
            <mesh position={[x, y, z]}>
              <boxGeometry args={[barWidth, order.quantity / scaleFactor, barWidth]} />
              <meshStandardMaterial color="green" />
            </mesh>
            <Text position={[x, y + 0.5, z]} fontSize={0.3} color="black">
              {order.price.toFixed(0)} / {order.quantity.toFixed(2)}
            </Text>
            <Text position={[x, 0.1, z]} fontSize={0.2} color="black">
              {now}
            </Text>
          </group>
        )
      })}

      {/* Asks - Red */}
      {asks.map((order, i) => {
        const x = 5
        const y = (order.quantity / scaleFactor) / 2
        const z = i * gap

        return (
          <group key={`ask-${i}`}>
            <mesh position={[x, y, z]}>
              <boxGeometry args={[barWidth, order.quantity / scaleFactor, barWidth]} />
              <meshStandardMaterial color="red" />
            </mesh>
            <Text position={[x, y + 0.5, z]} fontSize={0.3} color="black">
              {order.price.toFixed(0)} / {order.quantity.toFixed(2)}
            </Text>
            <Text position={[x, 0.1, z]} fontSize={0.2} color="black">
              {now}
            </Text>
          </group>
        )
      })}
    </group>
  )
}

export default Bars
