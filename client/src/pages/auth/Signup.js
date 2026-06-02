import { useEffect, useState } from "react";
import "./Signup.css";
import api from "../../api/axios.js";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo/logo-white.png";
import Lottie from "lottie-react";
import signupAnimation from "../../assets/lottie/Sign up.json";

const Signup = () => {
    const [username,setUsername] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [errors,setErrors] = useState([]);
    const [verified,setVerified] = useState(false);
    const [timer,setTimer] = useState(0);
    const minutes = String(Math.floor(timer/60)).padStart(2,"0");
    const seconds = String(timer%60).padStart(2,"0");
    const navigate = useNavigate();
    const handleSignup = async() =>{
        try {
            setErrors([]);
            await api.post("/auth/signup",{username,email,password});
            alert("Signup Successful");
            navigate("/");
        } catch (error) {
            if(error.response?.data?.errors){
                setErrors(error.response.data.errors);
            }
            else{
                setErrors([{msg:error.response?.data?.message || "Something went wrong"}])
            }
        }
    }
    const verifyMail = async() =>{
        try {
            const response = await api.post("/auth/verify-mail",{email});
            if(response.data.message) alert(response.data.message);
            else alert("Something wrong. Try Again");
            setTimer(120);
            const interval = setInterval(()=>{
                setTimer((prev)=>{
                    if(prev<=1){
                        clearInterval(interval);
                        return 0;
                    }
                    return prev-1;
                })
            },1000)
        } catch (error) {
            console.log(error);
            if(error.response?.data?.errors){
                setErrors(error.response.data.errors);
            }
            else{
                setErrors([{msg:error.response?.data?.message || "Something went wrong"}])
            }
        }
    }
    const checkVerification = async()=>{
        const response =
            await api.get(
                `/auth/verification-status/${email}`
            );
        setVerified(response.data.verified);
    }
    useEffect(() => {
        if (!email) return;
        const interval = setInterval(() => {
            checkVerification();
        }, 3000); // every 3 seconds
        return () => clearInterval(interval);
        // eslint-disable-next-line
    }, [email]);
    
    return ( 
            <div className="body">
                <div className="left-side">
                        <div className="animation">
                            <Lottie animationData={signupAnimation} loop={true} alt="signup animation" />
                        </div>
                </div>
                <div className="right-side">
                    <div className="signup">
                        <img src={logo} alt="logo" />
                        <h1 id="header">Get Started !</h1>
                        <h2>Enter Username</h2>
                        <input 
                            placeholder="Enter Username"
                            value={username}
                            onChange={(e)=>setUsername(e.target.value)}
                        />
                        <h2>Enter Email</h2>
                        <input 
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                        />
                        {
                        verified
                        ? <p>✅</p>
                        :<button 
                            onClick={()=>verifyMail()}
                            disabled={timer>0}
                        >
                        {timer>0 ? `Resend in ${minutes}:${seconds}` : "Verify Email"}    
                        </button>
                        }
                        <h2>Enter password</h2>
                        <input 
                            placeholder="Enter Password"
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
                                        handleSignup();
                                    }
                                    }
                                    >Signup →</button>
                                    <button id="btn"
                                        onClick={()=>navigate(-1)}
                                    >Go Back</button>
                                    </div>
                                </div>
                            </div>
            </div>
     );
}
 
export default Signup;