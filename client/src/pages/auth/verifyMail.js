import { useParams } from "react-router-dom";
import api from "../../api/axios.js";
import { useEffect,useState } from "react";

const VerifyMail = () => {
    const {token} = useParams();
    const [message,setMessage] = useState("");
    const [loading,setLoading] = useState(true);
    const verifyMailToken = async() =>{
        try {
            const response = await api.get(`/auth/verify-mail/${token}`);
            setMessage(response.data.message);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setMessage(error.response?.data.message || "Verification Failed");
            setLoading(false);
        }
    }
    useEffect(()=>{
        verifyMailToken();
        // eslint-disable-next-line
    },[token]);
    return ( 
        <div className="verifyMail">
            {loading ? <h1>Loading...</h1> : <h1>{message}</h1> }
            <h1>You may close this tab and continue signup.</h1>
        </div>
     );
}
 
export default VerifyMail;