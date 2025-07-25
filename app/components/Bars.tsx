import React from 'react'
import { Order } from './useBinanceWebSocketClient'
import { Text } from '@react-three/drei'

const roundPrice = (price: number) => Math.round(price / 10) * 10

const findPressureZones = (orders: Order[]) => {
  const grouped: Record<number, number> = {}

  for (let order of orders) {
    const roundedPrice = roundPrice(order.price)
    grouped[roundedPrice] = (grouped[roundedPrice] || 0) + order.quantity
  }

  const volumes = Object.values(grouped).sort((a, b) => b - a)
  const thresholdIndex = Math.floor(volumes.length * 0.2)
  const threshold = volumes[thresholdIndex] || 0

  const pressurePrices = Object.keys(grouped)
    .filter((price) => grouped[+price] >= threshold)
    .map(Number)

  return new Set(pressurePrices)
}

type BarsProps = {
  bids: Order[]
  asks: Order[]
}

const Bars = ({ bids, asks }: BarsProps) => {
  const barWidth = 0.8
  const gap = 1
  const scaleFactor = 2
  const now = new Date().toLocaleTimeString()

  const bidPressureZones = findPressureZones(bids)
  const askPressureZones = findPressureZones(asks)

  return (
    <group>
      {/* Bids - Green shades */}
      {bids.map((order, i) => {
        const x = -5
        const y = (order.quantity / scaleFactor) / 2
        const z = i * gap
        const roundedPrice = roundPrice(order.price)
        const isPressureZone = bidPressureZones.has(roundedPrice)
        const color = isPressureZone ? 'darkgreen' : 'lightgreen'

        return (
          <group key={`bid-${i}`}>
            <mesh position={[x, y, z]}>
              <boxGeometry args={[barWidth, order.quantity / scaleFactor, barWidth]} />
              <meshStandardMaterial color={color} />
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

      {/* Asks - Red shades */}
      {asks.map((order, i) => {
        const x = 5
        const y = (order.quantity / scaleFactor) / 2
        const z = i * gap
        const roundedPrice = roundPrice(order.price)
        const isPressureZone = askPressureZones.has(roundedPrice)
        const color = isPressureZone ? 'darkred' : 'lightcoral'

        return (
          <group key={`ask-${i}`}>
            <mesh position={[x, y, z]}>
              <boxGeometry args={[barWidth, order.quantity / scaleFactor, barWidth]} />
              <meshStandardMaterial color={color} />
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
