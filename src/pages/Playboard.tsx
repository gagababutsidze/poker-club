import React, { useEffect, useState, useRef } from 'react';
import RaiseComponent from './RaiseComponent';
import './playboard.css';
import { useWebSocket } from "../WS";
import { Action } from '@remix-run/router';


const Playboard = () => {

    const { socket } = useWebSocket();
    const [players, setPlayers] = useState<string[]>([]);
    const [coins, setCoins] = useState<number[]>([]);
    const [dealer, setDealer] = useState<string | null>(null);
    const [pot, setPot] = useState<number | null>(null);
    const [myCards, setMyCards] = useState<any | null>(null); // Update with correct type
    const [mySecondCard, setMySecondCard] = useState<any | null>(null); 
    const [isVisible, setIsVisible] = useState<any | undefined>(false)
    const [flopCards, setFlopCard1] = useState< any[]>();
    const playerName = window.localStorage.getItem('playerName');
    const tableId = window.localStorage.getItem('tableId');

 

    useEffect(() => {

        console.log('playboard chairto');
        
        if (!socket) return;

        socket.send(JSON.stringify({
            action: 'playGame',
            playerName,
            tableId
        }))

        socket.onmessage = (e) => {


               const data = JSON.parse(e.data);
                    console.log("Received data:", data);
    
                    if (data.pot) {
                        setPot(data.pot);
                    }
    
                    if (data.action === 'set-small-blind') {
                        console.log('Small blind action:', data);
                        // Handle small blind update
                    }
    
                    if (data.players) {
                        const updatedPlayers = data.players.map((p: any) => ({
                            playerName: p.playerName,
                            playerCoin: p.playerCoin,
                            dealer: p.playerName === data.dealer,
                        }));
    
                        const startIndex = updatedPlayers.findIndex((p: any) => p.playerName === playerName);
                        const reorderedPlayers = [
                            ...updatedPlayers.slice(startIndex),
                            ...updatedPlayers.slice(0, startIndex),
                        ];
    
                        setPlayers(reorderedPlayers.map(p => p.playerName));
                        setCoins(reorderedPlayers.map(p => p.playerCoin));
                        setDealer(data.dealer);
                      
                       
                      
                    }
    
                    if (data.holeCards) {
                        setMyCards(data.holeCards[0]);
                        setMySecondCard(data.holeCards[1]);


                      
                    }

                    
                    let test = false

                    if (data.action === 'your Turn') {
                        const currentPlayer = data.currentPlayer;
                        if (currentPlayer === playerName) {
                            test = true
                        }
                    }

                    
                    if (data.action === 'flop') {
                        setFlopCard1(data.flopCards)
                        console.log("🃏 Received Flop:", data.flopCards);
                   
                     
                    }

                      if (data.action === 'turn') {
                        setFlopCard1(data.turnCards)
                        console.log("🃏 Received Flop:", data.turnCards);
                   
                     
                    }
                        if (data.action === 'river') {
                        setFlopCard1(data.riverCard)
                        console.log("🃏 Received Flop:", data.flopCards);
                   
                     
                    }
                    
                };
            
        

        return () => {
            socket.onmessage = null;
        };
    }, [socket]);

 
    useEffect(() => {
        let test = false
        let test2 = false
        if (socket?.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({
                action: 'set-blinds', 
                playerName,
                tableId
            }));

            test = true
        }

        if (test) {
            if (socket?.readyState === WebSocket.OPEN) {
                socket.send(JSON.stringify({
                    action: 'pre-flop', 
                    playerName,
                    tableId
                }));

                console.log('gaigzavna');
                
                test = false
              
            }
            test2 = true
        }


        
    }, [])

    return (
        <div className="playboard">
            <div className='board-border'>
                <div className='board'>
                    <div className='player player-1'>
                        
                        {myCards && myCards.image_path && (
                            <div className='card-imagine-div'>
                                <div className='card-imagine'></div>
                                <div className='card-imagine'></div>
                            </div>
                        )}
                        <h2 className='player-name'>{players[2] || ''}</h2>
                        <h2>{coins[2]}</h2>
                    </div>
                    <div className='player player-2'>
                    <div className='cards-div'>
    {myCards?.image_path && (
        <img className='card first-card' src={`https://poker-club-backend-production.up.railway.app/cards/${myCards.image_path}`} alt="ggg" />
    )}
    {mySecondCard?.image_path && (
        <img className='card first-card' src={`https://poker-club-backend-production.up.railway.app/cards/${mySecondCard.image_path}`} alt="gggg" />
    )}
</div>


                        <h2 className='player-name'>{players[0] || ''}</h2>
                        <h2>{coins[0]}</h2>
                    </div>
                    <div className='player player-3'>
                        {myCards && myCards.image_path && (
                            <div className='card-imagine-div'>
                                <div className='card-imagine'></div>
                                <div className='card-imagine'></div>
                            </div>
                        )}
                        <h2 className='player-name'>{players[1] || ''}</h2>
                        <h2>{coins[1]}</h2>
                    </div>
                    <div className='pot'>
                        <h1>Pot: {pot}$</h1>
                        <h3>{dealer} is the dealer</h3>
                        {isVisible && (
                             <RaiseComponent  connection={socket}
                             tableId={tableId}
                             playerName={playerName} // Correct casing
                             action='raise'

                             />
                                 )}
                    </div>
                    <div className='boards-cards-div'>
    {flopCards&& flopCards.length > 0 &&
        flopCards?.map((card:any, index:any) => (
            <img key={index} className={`card flop-card${index}`}src={`https://poker-club-backend-production.up.railway.app/cards/${card.image_path}`} alt="" />
        ))
    }
</div>


                    <div className='player player-4'>
                        {myCards && myCards.image_path && (
                            <div className='card-imagine-div'>
                                <div className='card-imagine'></div>
                                <div className='card-imagine'></div>
                            </div>
                        )}
                        <h2 className='player-name'>{players[3] || ''}</h2>
                        <h2>{coins[3]}</h2>
                    </div>
                </div>
            </div>
            <div className='panel'>
                <button onClick={() => {
                    socket?.send(JSON.stringify({tableId: tableId, playerName: playerName, action: 'fold'}))
                }} className='panel-btn fold'>Fold</button>
                <button  onClick={() => {
                   socket?.send(JSON.stringify({tableId: tableId, playerName: playerName, action: 'call'}))
                }} className='panel-btn call'>Call</button>
                <button onClick={() => setIsVisible(!isVisible)}
                 className='panel-btn raise'>Raise</button>
                     <button onClick={() => {
                    socket?.send(JSON.stringify({tableId: tableId, playerName: playerName, action: 'check'}))
                }} className='panel-btn fold'>check</button>
            </div>
        </div>
    );
};

export default Playboard;
