import { useEffect, useState } from "react";
import { useWebSocket } from "../WS";
import { useNavigate } from 'react-router-dom';
import './pokerComponent.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faUser} from '@fortawesome/free-solid-svg-icons'

const PokerComponent = () => {

    const playerName = window.localStorage.getItem('playerName');
    const { socket, connect } = useWebSocket();
    const [test, setTest] = useState<string | null>(null);
    const [activePlayers, setActivePlayers] = useState<any[]>([]);

    const navigate = useNavigate();



    useEffect(() => {
        connect(); // Open WebSocket when PokerComponent renders

   
    
        if (socket) {
            
      
            socket.onopen = () => {
                console.log("WebSocket is open, sending data...");
               
            };
    
            socket.onmessage = (event) => {

                const data = JSON.parse(event.data)
                console.log(data);

                if (data.message) {
                    setTest(data.message);
        
                    
                }
                if(data.activePlayers) {
                    setActivePlayers(data.activePlayers || []);
                    console.log('players ',activePlayers);
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
        
        <div className="poker-component">
           
            <h1>პოკერი</h1>
            <h1>{test}</h1>
            <div className="active-players-div">
            {Array.from({ length: 4 }).map((_, index) => (
                <FontAwesomeIcon
                key={index}
                className={`users-icon ${index < activePlayers.length ? 'active' : ''}`}
                icon={faUser}

                
            />
             ))}
            </div>


            <h3>Welcome to the Poker Game!</h3>
            <button className="join-game-btn" onClick={() => {socket && 
                 socket.send(JSON.stringify({ playerName, action: 'joinGame' }));
            }}>შესვლა</button>
             <button className="join-game-btn" onClick={() => {socket && 
                 socket.send(JSON.stringify({ playerName, action: 'leave-line' }));
            }}>რიგის დატოვება</button>

        </div>
        
        </>
    );
};

export default PokerComponent;
