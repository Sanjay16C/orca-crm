import { useEffect, useState } from "react";
import api from "../api/axios.js";
import { useNavigate } from "react-router-dom";

const Workspaces = () => {
    const [workspaces,setWorkspaces] = useState([]);
    const [modal,setModal] = useState(false);
    const [name,setName] = useState("");
    const [code,setCode] = useState("");
    const [searchedWorkspace,setSearchedWorkspace] = useState({});
    const navigate = useNavigate();
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
            <h1>Workspaces</h1>
            
            <button
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
            {
                workspaces.map((workspace)=>(
                    <button
                        onClick={()=>handleClick(workspace._id)}
                        key={workspace._id}
                    >
                        <div className="workspace">
                            <h3>{workspace.name}</h3>
                            <h5>CODE : {workspace.code}</h5>
                            <h5>OWNER : {workspace.owner.username}</h5>
                        </div>
                    </button>
                    
                ))
            }
            <input 
                placeholder="Search Workspace"
                onChange={(e)=>setCode(e.target.value)}
                value={code}
            />
            <button onClick={()=>searchWorkspace()}>Search</button>
            <button 
                onClick={()=>{
                    setCode("");
                    setSearchedWorkspace({});
                }}
            >Clear</button>
            {
                searchedWorkspace._id && 
                <div className="workspace">
                    <h3>{searchedWorkspace.name}</h3>
                    <h5>CODE : {searchedWorkspace.code}</h5>
                    <h5>OWNER : {searchedWorkspace?.owner?.username}</h5>
                    <button onClick={()=>joinWorkspace(searchedWorkspace._id)}>JOIN</button>
                </div>
            }
            
        </div>

     );
}
 
export default Workspaces;