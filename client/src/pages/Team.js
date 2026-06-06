import { useState,useEffect } from "react";
import api from "../api/axios.js";
import { useNavigate, useParams } from "react-router-dom";
import "./Team.css";


const Team = () => {
    const {workspaceId} = useParams();
    const [members,setMembers] = useState([]);
    const [myRole,setMyRole] = useState("");
    const navigate = useNavigate();
    const fetchRole = async() =>{
        try {
            const response = await api.get(`/workspace/getMembership/${workspaceId}`);
            setMyRole(response.data.role);

        } catch (error) {
            console.log(error);
        }
    }
    const updateRole = async(role,userId,username) =>{
        try {
            const confirmUpdate = window.confirm(`Click Yes to Update Role of ${username}`);
            if(!confirmUpdate) return;
            await api.post("/workspace/update-role",{role,userId,workspaceId});
            setMembers((members)=>members.map(
                (member)=>member.user._id===userId
                    ? {...member,role}
                    : member
            ));
        } catch (error) {
            console.log(error); 
            alert(error.response?.data?.message);
        }
    }
    const fetchUsers = async() =>{
        try {
            const response = await api.get(`/auth/fetchusers/${workspaceId}/members`); 
            setMembers(response.data.members);
            } catch (error) {
                console.log(error.message);
            }
    }
    const removeMember = async(userId) =>{
        try {
            const confirmDelete = window.confirm("Are you sure?");
            if(!confirmDelete) return;
            const response = await api.delete("/workspace/removeMember",{data:{userId,workspaceId}});
            setMembers((members)=>members.filter((member)=>member.user._id!==userId));
            alert(response.data.message);
        } catch (error) {
            console.log(error.message);
            alert(error?.response?.data?.message||"Failed to remove member");
        }
    }
    useEffect(()=>{
        fetchUsers();
        fetchRole();
        // eslint-disable-next-line
    },[workspaceId]);
    useEffect(()=>{
        if(myRole==="member") navigate(`/workspace/${workspaceId}`);
    },[navigate,workspaceId,myRole]);
    return (
        <div className="team">
            
            <div className="team-table">
                <table>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Roles</th>
                            { myRole === "owner" &&
                                <th>
                                    Remove Member
                                </th>
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            members.map((member,ind)=>(
                                <tr className="user-row" key={member.user._id}>
                                    <td>{member.user.username}</td>
                                    <td>{member.user.email}</td>
                                    <td>
                                        <div className="role-btns">
                                            <button 
                                                className={
                                                    member.role==="owner"?"role-btn-active":"role-btn"
                                                }
                                                onClick={()=>updateRole("owner",
                                                    member.user._id , member.user.username
                                                )}
                                            >Owner</button>
                                            <button 
                                                className={
                                                    member.role==="admin"?"role-btn-active":"role-btn"
                                                }
                                                onClick={()=>updateRole("admin",
                                                    member.user._id , member.user.username
                                                )}
                                            >Admin</button>
                                            <button 
                                                className={
                                                    member.role==="member"?"role-btn-active":"role-btn"
                                                }
                                                onClick={()=>updateRole("member",
                                                    member.user._id , member.user.username
                                                )}
                                            >Member</button>
                                        </div>
                                    </td>
                                    { myRole === "owner" &&
                                        member.role !== "owner" &&
                                        <td>
                                            <button
                                                onClick={()=>removeMember(member.user._id)}
                                            >Delete</button>
                                        </td>
                                    }
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                
            </div>
        </div>
     );
}
 
export default Team;