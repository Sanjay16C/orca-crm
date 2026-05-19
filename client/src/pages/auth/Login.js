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
    const navigate = useNavigate();
    const onSignup = () =>{
        navigate("/signup");
    }
    const handleLogin = async() =>{
        try {
            const response = await api.post("/auth/login",{email,password});
            localStorage.setItem("token",response.data.token);
            navigate("/home");
        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    }
    return(
        <div className="body">
            <div className="left-side">
                <div className="animation">
                    <Lottie animationData={LoginAnimation} loop={true} />
                </div>
                
            </div>
            <div className="right-side">
                <img src={logo}/>
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
                    <div className="buttons">
                            <button id="btn"
                            onClick={()=>{
                                handleLogin();
                            }
                            }
                            >Login →</button>
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