import React from 'react'
import { Order } from './useBinanceWebSocketClient'

type Props = {
  bids: Order[]
  asks: Order[]
}

type PressureZone = {
  x: number
  y: number
  z: number
  volume: number
  type: 'bid' | 'ask'
}

function findPressureZones(orders: Order[], type: 'bid' | 'ask'): PressureZone[] {
  const zones: PressureZone[] = []
  const threshold = 20 // tweak this value based on actual data
  const groupSize = 3 // how many orders to cluster per zone

  for (let i = 0; i < orders.length - groupSize; i++) {
    const group = orders.slice(i, i + groupSize)
    const volume = group.reduce((sum, o) => sum + o.quantity, 0)

    if (volume >= threshold) {
      const avgPrice = group.reduce((sum, o) => sum + o.price, 0) / group.length
      const avgQuantity = volume / group.length
      zones.push({
        x: type === 'bid' ? -5 : 5,
        y: avgQuantity / 2,
        z: i,
        volume,
        type,
      })
    }
  }

  return zones
}

const PressureZones = ({ bids, asks }: Props) => {
  const bidZones = findPressureZones(bids, 'bid')
  const askZones = findPressureZones(asks, 'ask')

  return (
    <group>
      {bidZones.map((zone, i) => (
        <mesh key={`bid-zone-${i}`} position={[zone.x, zone.y, zone.z]}>
          <sphereGeometry args={[Math.sqrt(zone.volume) / 2, 32, 32]} />
          <meshStandardMaterial color="darkgreen" emissive="green" emissiveIntensity={0.5} />
        </mesh>
      ))}
      {askZones.map((zone, i) => (
        <mesh key={`ask-zone-${i}`} position={[zone.x, zone.y, zone.z]}>
          <sphereGeometry args={[Math.sqrt(zone.volume) / 2, 32, 32]} />
          <meshStandardMaterial color="darkred" emissive="red" emissiveIntensity={0.5} />
        </mesh>
      ))}
    </group>
  )
}

export default PressureZones
