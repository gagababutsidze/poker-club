import './header.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faUser} from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import Dashboard from './Dashboard';


const Header = (props:any) => {

      const [isVisible, setIsVisible] = useState(false);
        
        // Function to show the component on click
        const handleClick = () => {
          if (!isVisible) {
            setIsVisible(true); // Set to true, only if it's not visible
          }
        }

    const token = window.localStorage.getItem('token')

    return(
        <header className='header'>

        <h1 className='name'>All In Play</h1>
        {
            token ?<FontAwesomeIcon  onClick={props.func} className='user-icon' icon={faUser} /> 
            :  <nav>
            <ul>
                <li>რეგისტრაცია</li>
                <li>შესვლა</li>
            </ul>
        </nav>
        }
      

        </header>
    )
}

export default Header