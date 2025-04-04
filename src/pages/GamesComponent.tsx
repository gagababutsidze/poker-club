import PokerComponent from './PokerComponent';
import { useState } from 'react';

const GamesComponent = () => {
    const [isVisible, setIsVisible] = useState(false);
    
    // Function to show the component on click
    const handleClick = () => {
      if (!isVisible) {
        setIsVisible(true); // Set to true, only if it's not visible
      }
    }

    return(
        <div className='games-div'>
            <div onClick={handleClick} className='poker-out-div'>
                <div className='poker-div'>
                <img src={require('../assets/poker.webp')} alt='poker' />
            </div>
            <h3>poker</h3>
            </div>
      
           
            {isVisible && (
            <div>
                <PokerComponent />
            </div>
            )}
        </div>
    )
}



export default GamesComponent


