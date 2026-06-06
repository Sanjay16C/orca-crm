import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios.js";
import { useEffect, useState } from "react";

const Settings = () => {
    const {workspaceId} = useParams();
    const navigate = useNavigate();
    const [myRole,setMyRole] = useState("");
    const [deleteModal,setDeleteModal] = useState(false);
    const [confirm,setConfirm] = useState("");
    const DeleteWorkspace = async() =>{
        try {
            if(confirm!=="CONFIRM"){
                alert("Type CONFIRM to delete");
                return;
            } 
            const confirmDelete = window.confirm("This Action is Very Destructive. Are You Sure?")
            if(!confirmDelete) return;
            setConfirm("");
            setDeleteModal(false);
            await api.delete(`/workspace/delete-workspace/${workspaceId}`);
            navigate("/workspaces");
        } catch (error) {
            console.log(error);
        }
    }
    const fetchRole = async() =>{
        try {
            const response = await api.get(`/workspace/getMembership/${workspaceId}`);
            setMyRole(response.data.role);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
            fetchRole();
            // eslint-disable-next-line
        },[workspaceId]);
    return (
        <div className="settings">
            {
                myRole !== "owner" && <h1>WORK IN PROGRESS</h1>
            }
            {
                myRole === "owner" &&
                <div className="delete-workspace">
                    <button
                        onClick={()=>setDeleteModal(true)}
                    >Delete Workspace</button>
                </div>
            }
            {
                myRole ==="owner" && 
                deleteModal && 
                <div className="overlay">
                    <div className="deleteModal">
                        <h3>Type "CONFIRM" to Delete this Workspace</h3>
                        <input 
                            placeholder="CONFIRM"
                            value={confirm}
                            onChange={(e)=>setConfirm(e.target.value)}
                        />
                        <button
                            onClick={()=>DeleteWorkspace()}
                        >Delete Workspace</button>
                        <button onClick={()=>setDeleteModal(false)}>Cancel</button>
                  </div>
                </div>
                  
            }    
        </div>
    );
}

export default Settings;