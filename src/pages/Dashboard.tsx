import './dashboard.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import PokerComponent from './PokerComponent';

const Dashboard = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Function to show the component on click
  const handleClick = () => {
    if (!isVisible) {
      setIsVisible(true); // Set to true, only if it's not visible
    }
  };

  return (
    <div className='body-dashboard'>
      <h2>most popular</h2>
      <div className='games-div'>
        <div onClick={handleClick} className='poker-out-div'>
          <div className='poker-div'>
            <img src={require('../assets/poker.webp')} alt='poker' />
          </div>
          <h3>poker</h3>
        </div>

        {/* Render PokerComponent when visible */}
        {isVisible && (
          <div>
            <PokerComponent />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
