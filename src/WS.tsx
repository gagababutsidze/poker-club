import React, { createContext, useContext, useState, useEffect } from "react";

const WebSocketContext = createContext<{
    socket: WebSocket | null;
    connect: () => void;
    disconnect: () => void;
}>({
    socket: null,
    connect: () => {},
    disconnect: () => {},
});

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [socket, setSocket] = useState<WebSocket | null>(null);

    const connect = () => {
        if (socket) return; // Avoid duplicate connections

        const ws = new WebSocket("wss://poker-club-backend-production.up.railway.app");

        ws.onopen = () => console.log("WebSocket Connected");
        ws.onclose = () => console.log("WebSocket Disconnected");
        ws.onerror = (err) => console.error("WebSocket Error:", err);

        setSocket(ws);
    };

    const disconnect = () => {
        if (socket) {
            socket.close();
            setSocket(null);
        }
    };

    return (
        <WebSocketContext.Provider value={{ socket, connect, disconnect }}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = () => useContext(WebSocketContext);
