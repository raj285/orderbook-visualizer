'use client'
import dynamic from 'next/dynamic'
const OrderBookScene = dynamic(() => import('./components/OrderbookScene'), {
  ssr: false, // Disable server-side rendering for this component
})
export default function Home() {
  return (
    <div className="container mx-auto p-4">
    <OrderBookScene/>
    </div>
  );
}
 