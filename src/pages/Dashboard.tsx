import './dashboard.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import PokerComponent from './PokerComponent';
import Header from './Header';
import GamesComponent from './GamesComponent';

const Dashboard = () => {

  let [isVisible, setIsVisible] = useState(false)

  const func = () => {
    if(!isVisible){
      setIsVisible(true)
    }
    else if(isVisible) {
      setIsVisible(false)
    }
  }

  return (
    <div>
      <Header func={func} />
      <div className='body-dashboard'>
        <GamesComponent/>

         {
                   isVisible ? <div className='profile-div'></div> 
                    : null }

      </div>
    </div>
  );
};

export default Dashboard;
