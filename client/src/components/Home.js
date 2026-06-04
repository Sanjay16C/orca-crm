import "./Home.css";
import logo from "../assets/logo/logo-white.png";
import logout from "../assets/app-icons/logout.png";
import userprofile from "../assets/spider.png";
import { NavLink,Outlet,useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api/axios.js";

const Home = () => {
    const navigate = useNavigate();
    const handleLogout = async() =>{
        const isConfirm = window.confirm("Click OK to Logout");
        if(isConfirm){
            try {
                await api.post("/auth/logout");
            } catch (error) {
                console.log(error);
            } finally {
                localStorage.removeItem("accessToken");
                navigate("/");
            }
            
        }
    }
    const location = useLocation();
    const currentPage = location.pathname.split("/")[3] || "customers";
    const [sidebaropen,setSidebarOpen] = useState(true);
    const sidebarList = [
    {
        name:"Customers",
        path:""
    },
    {
        name:"Dashboard",
        path:"dashboard"
    },
    {
        name:"Calendar",
        path:"calendar"
    },
    {
        name:"Team",
        path:"team"
    },
    {
        name:"Analytics",
        path:"analytics"
    },
    {
        name:"Settings",
        path:"settings"
    }
];
    return (
        <div className="home">
            <div className={sidebaropen ? "sidebar" : "sidebar-close"}>
                            <div className="logo">
                                    <button className="hamburger"
                                        onClick={()=>setSidebarOpen(!sidebaropen)}
                                    >☰</button>
                                    {sidebaropen && <img src={logo} className="logo-img" alt="Logo"/>}
                            </div>
                            {sidebaropen && sidebarList.map((li)=>(
                                <NavLink 
                                    key={li.name}
                                    to={li.path}
                                    end={li.path===""}
                                    className={({isActive})=>(
                                        isActive ? "sidebarbtn-active" : "sidebarbtn"
                                    )}
                                >
                                    {li.name}
                                </NavLink>
                            ))}
            </div>
            
            <div className="main">
                        <div className="navbar">
                        <div className="nav-left">
                           {currentPage.charAt(0).toUpperCase()+currentPage.slice(1)}
                        </div>
                        <div className="nav-right">
                            <button className="userprofile-btn">
                                <img className="userprofile-img" src={userprofile} alt="profile" />
                            </button>
                            <button className="logout-btn"
                                onClick={()=>handleLogout()}
                            >
                                <img className="logout-img" src={logout} alt="logout" />
                            </button>
                        </div>
                    
                    </div>
                        <div className="page-content">
                            <Outlet />
                        </div>
                        
            </div>
        </div>
     );
}
 
export default Home;