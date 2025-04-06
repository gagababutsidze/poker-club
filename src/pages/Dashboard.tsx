import './dashboard.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import PokerComponent from './PokerComponent';
import Header from './Header';
import GamesComponent from './GamesComponent';
import ProfileComponent from './ProfileComponent';

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
                   isVisible ? <ProfileComponent/>
                    : null }

      </div>
    </div>
  );
};

export default Dashboard;
