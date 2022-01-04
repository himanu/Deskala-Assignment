import { useState } from "react";
import Home from './Components/Home';
import Login from './Components/Login';
import Signup from './Components/Signup';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    // const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [isUserRegistered, setIsUserRegistered] = useState(false);
    const [message, setMessage] = useState('');
    const [username, setUsername] = useState('');
    if(username) {
        return <Home username={username}/>
    }
    return (
        <>
            {isUserRegistered && <Login setIsUserLoggedIn={setUsername} setIsUserRegistered={setIsUserRegistered} setMessage={setMessage}/> }
            {!isUserRegistered && <Signup setIsUserLoggedIn={setUsername} setIsUserRegistered={setIsUserRegistered} setMessage={setMessage}/>}
            <div className="message">
                {message}
            </div>
        </>
    )
}
export default App;