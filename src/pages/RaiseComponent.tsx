import { tab } from "@testing-library/user-event/dist/tab";
import React, { MutableRefObject } from "react";
import { useEffect, useState } from "react";

interface RaiseComponentProps {
    connection: any;
    tableId: string | null;
    playerName: string | null;
    action: string;
  }

const RaiseComponent: React.FC<RaiseComponentProps> = ({
    connection,
    tableId,
    playerName,
    action,
 }) => {
    const [value, setValue] = useState<number | undefined>(undefined);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(Number(event.target.value)); // Convert the input value to a number
    };

    const sendMessage = () => {
        connection.send(JSON.stringify({
            tableId: tableId,
            playerName: playerName,
            action: action,
            raiseAmount: value
        }))

        console.log({   tableId: tableId,
            playerName: playerName,
            action: action,
            raiseAmount: value});
        
    }
  
    return (
      <div>
        <input
          onChange={handleInputChange}
          type="number"
          className="border p-2"
          placeholder="Enter a number"
        />


        <button onClick={() => sendMessage()}>ok</button>
       
      </div>
    );
};

export default RaiseComponent;
