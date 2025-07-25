import Image from "next/image";
import OrderbookScene from "./components/OrderbookScene";
import useBinanceWebSocketClient from "./components/useBinanceWebSocketClient";
export default function Home() {
  return (
    <div className="container mx-auto p-4">
    <OrderbookScene/>
    </div>
  );
}
 