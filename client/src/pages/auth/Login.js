import api from "../../api/axios.js";
import "./Login.css";
import { useState } from "react";
import {useNavigate} from "react-router-dom";
import Lottie from "lottie-react";
import LoginAnimation from "../../assets/lottie/Customer support.json";
import logo from "../../assets/logo/logo-white.png";
const Login = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [errors,setErrors] = useState([]);
    const navigate = useNavigate();
    const onSignup = () =>{
        navigate("/signup");
    }
    const handleLogin = async() =>{
        try {
            setErrors([]);
            const response = await api.post("/auth/login",{email,password});
            localStorage.setItem("accessToken",response.data.accessToken);
            navigate("/home");
        } catch (error) {
            if(error.response?.data?.errors){
                setErrors(error.response.data.errors);
            }
            else{
                setErrors([{msg:error.response?.data?.message || "Something went wrong"}])
            }
        }
    }
    
    return(
        <div className="body">
            <div className="left-side">
                <div className="animation">
                    <Lottie animationData={LoginAnimation} loop={true} alt="login animation" />
                </div>
                
            </div>
            <div className="right-side">
                <img src={logo} alt="logo" />
                <h2 id="header">Welcome Back !</h2>
                <div className="login">
                    <h2>Enter Email</h2>
                    <input 
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                    <h2>Enter Password</h2>
                    <input 
                        placeholder="Enter password"
                        value={password}
                        type="password"
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                    {
                        errors.map((error,index)=>(
                            <p key={index} className="error">{error.msg}</p>
                        ))
                    }
                    <div className="buttons">
                            <button id="btn"
                            onClick={()=>{
                                handleLogin();
                            }
                            }
                            >Login →</button>
                            <button id="btn"
                            onClick={()=>{
                                navigate("/forgot-password");
                            }
                            }
                            >Forgot Password →</button>
                            <button id="btn"
                                onClick={()=>onSignup()}
                            >Create new account</button>
                            
                    </div>
                    
                </div>
            </div>
            
        </div>
            
     );
}
 
export default Login;