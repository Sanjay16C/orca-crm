import { useEffect, useState } from "react";
import api from "../api/axios.js";
import { useNavigate } from "react-router-dom";
import logout from "../assets/app-icons/logout.png";
import "./Workspaces.css";

const Workspaces = () => {
    const [workspaces,setWorkspaces] = useState([]);
    const [modal,setModal] = useState(false);
    const [name,setName] = useState("");
    const [code,setCode] = useState("");
    const [searchedWorkspace,setSearchedWorkspace] = useState({});
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
    const handleClick = (workspaceId) =>{
        navigate(`/workspace/${workspaceId}`);
    }
    const joinWorkspace = async(workspaceId) =>{
        try {
            await api.post("/workspace/join",{code});
            navigate(`/workspace/${workspaceId}`);
        } catch (error) {
            console.log(error);
        }
    }
    const createWorkspace = async() =>{
        try {
            const response = await api.post("/workspace/create",{name});
            setWorkspaces([...workspaces,response.data?.workspace]);
            setModal(false);
        } catch (error) {
            console.log(error);
        }
    }
    const searchWorkspace = async() =>{
        try {
            const response = await api.post("/workspace/search",{code});
            setSearchedWorkspace(response.data?.workspace);
        } catch (error) {
            console.log(error);
        }
    }
    const getAllWorkspace = async() =>{
        try {
            const response = await api.get("/workspace/getAll");
            setWorkspaces(response.data.workspaces);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        getAllWorkspace();
    },[]);
    return (
        <div className="workspaces">
            <div className="w-navbar">
                <button className="logout-btn"
                    onClick={()=>handleLogout()}
                >
                <img className="logout-img" src={logout} alt="logout" />
                </button>
            </div>
            <div className="not-navbar">
            <h1>Workspaces</h1>
            <button className="w-btn"
                onClick={()=>setModal(true)}
            >Create Workspace</button>
            {modal && 
                <div className="overlay">
                    <div className="modal">
                        <h3>Create Workspace</h3>
                        <h4>Name</h4>
                        <input 
                            onChange={(e)=>setName(e.target.value)}
                        />
                        <button onClick={()=>createWorkspace()}>Create</button>
                        <button onClick={()=>setModal(false)}>Cancel</button>
                    </div>
                </div>
            }
            <h1>List</h1>
            <div className="workspaces-list">
            {
                workspaces.map((workspace)=>(
                    <button
                        className="workspace-btn"
                        onClick={()=>handleClick(workspace._id)}
                        key={workspace._id}
                    >
                        <div className="workspace">
                            <h3 className="workspace-name">{workspace.name}</h3>
                            <h5 className="workspace-details">CODE : {workspace.code}</h5>
                            <h5 className="workspace-details">OWNER : {workspace.owner.username}</h5>
                        </div>
                    </button>
                    
                ))
            }
            </div>
            <input 
                placeholder="Search Workspace"
                onChange={(e)=>setCode(e.target.value)}
                value={code}
            />
            <button onClick={()=>searchWorkspace()}
                    className="w-btn"
                >Search</button>
            <button 
                onClick={()=>{
                    setCode("");
                    setSearchedWorkspace({});
                }}
                className="w-btn"
            >Clear</button>
            {
                searchedWorkspace._id && 
                <div className="searched-workspace">
                    <h3 className="workspace-name">{searchedWorkspace.name}</h3>
                    <h5 className="workspace-details">CODE : {searchedWorkspace.code}</h5>
                    <h5 classname="workspace-details">OWNER : {searchedWorkspace?.owner?.username}</h5>
                    <button 
                    className="w-btn"
                    onClick={()=>joinWorkspace(searchedWorkspace._id)}>JOIN</button>
                </div>
            }
            </div>  
        </div>

     );
}
 
export default Workspaces;