import { useState } from "react";
import { postRequest } from "./api";

const Signup = ({setIsUserLoggedIn, setIsUserRegistered, setMessage}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    function handleSubmit(e) {
        e.preventDefault();
        postRequest('http://localhost:4000/signup',{
            username: email,
            phoneNo,
            password
        })
            .then((res)=> res.json())
            .then((res)=>{
                if(res.success) {
                    setIsUserLoggedIn(email);
                    setMessage('Welcome');
                } else if(res.error) {
                    setMessage(res.message);
                } else {
                    setMessage(res.message);
                }
            })
            .catch((err)=> console.log("Err ",err)
        )
    }
    return (
        <form className="formContainer" autoComplete="off" onSubmit={handleSubmit}>
            <h3>Sign Up</h3>
            <div>
            <div className="form-group">
                <label>Email Id</label>
                <input type="email" pattern="[a-z0-9._%+-]+@gmail.com" className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your email id" autoComplete="off" />
            </div>

            <div className="form-group">
                <label>Phone Number</label>
                <input type="tel" pattern="[0-9]{10}" className="form-control" value={phoneNo} onChange={(e)=>setPhoneNo(e.target.value)} placeholder="Enter your phone no" autoComplete="off"/>
            </div>

            <div className="form-group">
                <label>Password</label>
                <input type="password" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+=]).*$" className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)}  placeholder="Enter your password" autoComplete="off" />
            </div>
            </div>

            <button type="submit" className="btn btn-dark btn-lg btn-block">Register</button>
            <p className="forgot-password text-right">
                Already registered <span style={{cursor: "pointer", color: "#0dcaf0"}} onClick={(e)=>{e.preventDefault(); setIsUserRegistered(true)}} >log in?</span>
            </p>
        </form>

    )
}
export default Signup;