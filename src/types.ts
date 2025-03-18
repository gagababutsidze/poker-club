interface cardsType {
    id: number,
    image_path: string,
    name:string
}
export interface playersType {
    playerName: string;
    playerCoin: number;
    isDealer: boolean;
    dealer?: string; // Make dealer optional
}

    

export default cardsType
