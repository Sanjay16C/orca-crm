import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";

const OauthSuccess = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    useEffect(()=>{
        const token = searchParams.get("token");
        if(token){
            localStorage.setItem("accessToken",token);
            navigate("/home");
        }
    },[searchParams,navigate]);
    return ( 
        <div className="oauthsuccess">
            <h1>Logging in...</h1>
        </div>
     );
}
 
export default OauthSuccess;