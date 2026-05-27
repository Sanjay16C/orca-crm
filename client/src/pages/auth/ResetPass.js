import { useState } from "react";
import api from "../../api/axios.js";
import { useNavigate, useParams } from "react-router-dom";
const ResetPass = () => {
    const {token} = useParams();
    const [password,setPass] = useState("");
    const navigate = useNavigate();
    const handleResetPass = async() =>{
        try {
            const response = await api.post(`/auth/reset-password/${token}`,{password});
            alert(response.data.message);
            setPass("");
            navigate("/");
        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    }
    return ( 
        <div className="ResetPass">
            <h1>ResetPass</h1>
            <h3>Enter Your New Password</h3>
            <input 
                
                value={password}
                onChange={(e)=>setPass(e.target.value)}
            />
            <button
                onClick={()=>handleResetPass()}
            >Submit</button>
        </div>
     );
}
 
export default ResetPass;