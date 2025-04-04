import './login.css';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  let [email, setEmail] = useState<string>('');
  let [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const sendData = () => {
    axios.post('https://poker-club-backend.onrender.com/api/login', { email, password })
      .then(response => {
        console.log(response.data);
        // Store token and navigate to playboard page
        window.localStorage.setItem('token', response.data.token);
        window.localStorage.setItem('playerName', response.data.email)
        navigate('/'); // Redirect to playboard page after login
      })
      .catch(error => {
        console.error('There was an error logging in:', error);
      });
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent page refresh
    sendData(); // Call the sendData function to handle the login request
  };

  return (
    <div className="login-background">
      <form onSubmit={handleSubmit}>
        <input onChange={handleEmailChange} type="email" placeholder="Email" value={email} />
        <input onChange={handlePasswordChange} type="password" placeholder="Password" value={password} />
        <button type="submit" className="login">Login</button>
      </form>
    </div>
  );
};

export default Login;
