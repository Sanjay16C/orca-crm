import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios.js";
import { useEffect, useState } from "react";
import "./Settings.css";
import userprofile from "../assets/spider.png";
import { useRef } from "react";

const Settings = () => {
    const {workspaceId} = useParams();
    const navigate = useNavigate();
    const [myRole,setMyRole] = useState("");
    const [deleteModal,setDeleteModal] = useState(false);
    const [confirm,setConfirm] = useState("");
    const [profilePicture,setProfilePicture] = useState(userprofile);
    const [workspaceCode,setWorkspaceCode] = useState("");
    const fileInputRef = useRef(null);
    const uploadProfilePicture = async(file) =>{
        try {
            if(!file) return;
            const formData = new FormData();
            formData.append("profilePicture",file);
            const response = await api.patch("/auth/profilepic-upload",formData);
            setProfilePicture(response.data.imageUrl || userprofile);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }
    const fetchProfilePicture = async() =>{
        try {
            const response = await api.get("/auth/fetchProfilePic");
            setProfilePicture(response.data.imageUrl || userprofile);
        } catch (error) {
            console.log(error);
        }
    }
    const handleWorkspaceCodeRotation = async() =>{
        try {
            const response = await api.patch(`/workspace/rotateCode`,{workspaceId});
            setWorkspaceCode(response.data.new_code || "");
        } catch (error) {
            console.log(error);
            alert(error.response?.data?.message)
        }
    }
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
    const fetchWorkspaceCode = async() =>{
        try {
            const response = await api.get(`/workspace/fetchWCode/${workspaceId}`);
            setWorkspaceCode(response.data.code || "");
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
            fetchRole();
            fetchProfilePicture();
            fetchWorkspaceCode();
            // eslint-disable-next-line
        },[workspaceId]);
    return (
        <div className="settings">
            <div className="profile-pic">
                <img 
                    src={profilePicture}
                    alt="profilePic"
                    onClick={()=>fileInputRef.current.click()}
                />
            </div>
            <input 
                type="file"
                ref={fileInputRef}
                style={{display:"none"}}
                accept="image/*"
                onChange={(e)=>uploadProfilePicture(e.target.files[0])}
            />
            <div className="workspace-code">
                { myRole !== "member" &&
                    <div className="code">
                    {workspaceCode}
                    </div>
                }
                { myRole === "owner" &&
                    <button onClick={()=>handleWorkspaceCodeRotation()}
                        className="rotate-btn"
                    >🔁</button>
                }
                </div>
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