import Image from "next/image";
import OrderbookScene from "./components/OrderbookScene";
import BinanceWebSocketClient from "./components/BinanceWebSocketClient";
export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <BinanceWebSocketClient/>
    <h1 className="text-2xl font-bold mb-4">Orderbook Depth Visualizer</h1>
    <OrderbookScene/>
    </div>
  );
}
