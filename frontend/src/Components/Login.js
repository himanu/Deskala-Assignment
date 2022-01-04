import { useState } from "react";
import { postRequest } from "./api";

const Login = ({setIsUserRegistered, setIsUserLoggedIn, setMessage}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    function handleSubmit(e) {
        e.preventDefault();
        postRequest('http://localhost:4000/login',{
            username: email,
            password
        })
        .then((res)=>res.json())
        .then((res)=>{
            if(res.success) {
                setIsUserLoggedIn(email);
                setMessage(res.message);
            } else if(res.error) {
                setMessage(res.message);
            } else {
                setMessage(res.message);
            }
        })
        .catch((err)=>{
            console.log("Error ", err);
            setMessage("Client side error");
        })
    }
    return (
        <form className="loginContainer" autoComplete="off" onSubmit={handleSubmit}>
            <h3>Log in</h3>

            <div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" pattern="[a-z0-9._%+-]+@gmail.com" className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter email" autoComplete="off" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control"  value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter password" />
                </div>
            </div>

            <button type="submit" className="btn btn-dark btn-lg btn-block">Sign in</button>
            <p className="forgot-password text-right">
                Not registered <span style={{cursor: "pointer", color: "#0dcaf0"}} onClick={(e)=>{e.preventDefault(); setIsUserRegistered(false)}} >Sign Up?</span>
            </p>
        </form>
    )
}

export default Login;