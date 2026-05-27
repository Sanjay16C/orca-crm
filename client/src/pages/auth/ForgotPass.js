import { useState } from "react";
import api from "../../api/axios.js";

const ForgotPass = () => {
    const [email,setEmail] = useState("");
    const handleForgotPass = async() =>{
        try {
            const response = await api.post("/auth/forgot-password",{email});
            alert(response.data.message);
            setEmail("");
        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    }
    return ( 
        <div className="ForgotPass">
            <h1>Forgot Password ?</h1>
            <h3>Enter Your Email</h3>
            <input 
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
            />
            <button
                onClick={()=>handleForgotPass()}
            >Submit</button>
        </div>
     );
}
 
export default ForgotPass;