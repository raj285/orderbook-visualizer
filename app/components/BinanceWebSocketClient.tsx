"use client"

import { useEffect,useState } from "react"

const BinanceWebSocketClient = () => {
    const [bids, setBids] = useState([]);
    const [asks, setAsks] = useState([]);
    useEffect(()=>{
        const ws = new WebSocket("wss://fstream.binance.com/ws/btcusdt@depth20@100ms");
        ws.onopen = () => {
            console.log("WebSocket connection established"); 
        };
        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            // console.log("Received data:", data);
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
        ws.onerror = (error) => {
            console.error("WebSocket error:", error);
        };
        return () => {
            ws.close();
            console.log("WebSocket connection closed on component unmount");
        };
    }, []);
  return (
    null
  )
}

export default BinanceWebSocketClient
