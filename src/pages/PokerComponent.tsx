/*import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Playboard from './Playboard';
//import { useWebSocket } from '../WebSocketContext';

const PokerComponent = () => {
    const playerName = window.localStorage.getItem('playerName');
    const [test, setTest] = useState<string | null>(null);
    const navigate = useNavigate();
    const connection = useRef<WebSocket | null>(null);
    let [check, setCheck] = useState(false)

    useEffect(() => {
                console.log('პოკერ კომპონენტი ჩაირთო');
        let is = false

        if (!connection.current) {
            connection.current = new WebSocket('ws://localhost:8080/join')
            // Handle WebSocket events
            connection.current.onopen = () => {
               connection.current?.send(JSON.stringify({ playerName, action: 'joinGame' }));
            };

            connection.current.onmessage = (e:any) => {
                
                const data = JSON.parse(e.data);
                console.log('PokerComponent received:', data);
                setTest(data.message);
                if (data.tableId) {

                    let gaga = false


                    const func = () => {
                        let test = connection.current?.send(JSON.stringify({ playerName, action: 'close connection' }));
                        gaga = true;
                    }

                    func()

                   


                    setTimeout(() => {
                        connection.current?.close();
                        console.log('WebSocket connection closed');
                    }, 100);
                    if (gaga) {
                        window.localStorage.setItem('tableId', data.tableId)
                        navigate(`/play/${data.tableId}`)
                    }
           
                }


                
            }

  

        }

            
     
    }, []);    

    return (
        <>
        
           
            <h1>{test}</h1>
            <h3>Welcome to the Poker Game!</h3>
       
        
        </>
    );
};

export default PokerComponent;
*/


import { useEffect, useState } from "react";
import { useWebSocket } from "../WS";
import { useNavigate } from 'react-router-dom';

const PokerComponent = () => {

    const playerName = window.localStorage.getItem('playerName');
    const { socket, connect } = useWebSocket();
    const [test, setTest] = useState<string | null>(null);
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

                if (data.message) {
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
            <h3>Welcome to the Poker Game!</h3>
       
        
        </>
    );
};

export default PokerComponent;
