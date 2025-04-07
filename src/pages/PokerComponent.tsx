import { useEffect, useState } from "react";
import { useWebSocket } from "../WS";
import { useNavigate } from 'react-router-dom';
import './pokerComponent.css'

const PokerComponent = () => {

    const playerName = window.localStorage.getItem('playerName');
    const { socket, connect } = useWebSocket();
    const [test, setTest] = useState<string | null>(null);
    const [activePlayers, setActivePlayers] = useState<any>(null);

    const navigate = useNavigate();

    useEffect(() => {
        connect(); // Open WebSocket when PokerComponent renders
    
        if (socket) {
            socket.onopen = () => {
                console.log("WebSocket is open, sending data...");
                socket.send(JSON.stringify({ playerName, action: 'joinGame' }));
            };
    
            socket.onmessage = (event) => {

                const data = JSON.parse(event.data)
                console.log(data);

                if (data.message && data.activePlayers) {
                    setTest(data.message)
                }
                
                if (data.tableId) {
                    window.localStorage.setItem('tableId', data.tableId)
                    navigate(`/play/${data.tableId}`)
                
                }
            };
        }
    
        return () => {
         
        };
    }, [connect, socket]);
    
    

    return  (
        <>
        
           
            <h1>{test}</h1>
            <div className="active-players-div"></div>
            <h3>Welcome to the Poker Game!</h3>
       
        
        </>
    );
};

export default PokerComponent;
