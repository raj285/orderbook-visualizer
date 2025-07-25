"use client"

import { useEffect,useState ,useRef} from "react"
export type Order = { price: number; quantity: number } // is writing this important???
const useBinanceWebSocketClient = (symbol = 'btcusdt', level = 20) => {
const [bids, setBids] = useState<Order[]>([]);
const [asks, setAsks] = useState<Order[]>([]);

     const wsRef = useRef<WebSocket | null>(null)
  const lastUpdateId = useRef<number>(0)
    useEffect(()=>{
         let isSubscribed = true;
             // 1. Fetch initial snapshot via REST
    fetch(`https://fapi.binance.com/fapi/v1/depth?symbol=${symbol.toUpperCase()}&limit=${level}`)
      .then(res => res.json())
      .then(snapshot => {
        if (!isSubscribed) return
        lastUpdateId.current = snapshot.lastUpdateId

        setBids(snapshot.bids.map(([p, q]: [string, string]) => ({
          price: parseFloat(p),
          quantity: parseFloat(q),
        })))
        setAsks(snapshot.asks.map(([p, q]: [string, string]) => ({
          price: parseFloat(p),
          quantity: parseFloat(q),
        })))
    })
        const ws = new WebSocket('wss://fstream.binance.com/ws/btcusdt@depth20@100ms');
        wsRef.current = ws
        ws.onopen = () => {
            console.log("WebSocket connection established"); 
        };
        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log("Received data:", data);
          if (data.u <= lastUpdateId.current) return
          // Optionally validate sequence continuity using d.U, d.u, d.pu...            
            const bidsData = data.b.map((Temp)=>{
                return {
                    price: parseFloat(Temp[0]),
                    quantity: parseFloat(Temp[1])
                };
            });
            const asksData = data.a.map((Temp)=>{
                return {
                    price: parseFloat(Temp[0]),
                    quantity: parseFloat(Temp[1])
                };
            });
            setBids(bidsData);
            setAsks(asksData);
            // console.log("Bids:", bidsData);
            // console.log("Asks:", asksData        
        } 
        ws.onclose = () => {
            console.log("WebSocket connection closed");
        };
ws.onerror = (event: Event) => {
  console.error("WebSocket error occurred", event);
};
        return () => {
      isSubscribed = false
      if (wsRef.current) wsRef.current.close()
        }; 
    }, [symbol, level]);
  return (
    {bids, asks}
  )
}

export default useBinanceWebSocketClient;