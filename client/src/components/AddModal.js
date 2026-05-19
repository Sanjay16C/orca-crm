import api from "../api/axios.js";
import "./AddModal.css";
import { useState } from "react";
const AddModal = ({setModal,setCustomer,customer,users,setUsers}) => {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [phone,setPhone] = useState("");
    const [company,setCompany] = useState("");
    const [priority,setPriority] = useState("3");
    const [status,setStatus] = useState("Lead");
    const [assignedTo,setAssignedTo] = useState("");
    const [lastcontacted,setLastcontacted] = useState("");
    const [nextFollowup,setnextFollowup] = useState("");
    const createCustomer = async() =>{
        try {
            const response = await api.post("/customer/create",{name,email,phone,company,priority,status,assignedTo,lastcontacted,nextFollowup});
            setModal(false);
            setCustomer([...customer,response.data.cust]);
        } catch (error) {
            console.log(
                error.response?.data || error.message
            );
        }
    }
    return (
        <div className="overlay">
            <div className="modal">
                <h1>Add new Customer</h1>
                <div className="inp">
                    <div className="field">
                    <h2>Name</h2>
                    <input
                        value = {name}
                        onChange={(e)=>setName(e.target.value)}
                    ></input>
                    </div>
                    <div className="field">
                    <h2>Email</h2>
                    <input
                        value = {email}
                        onChange={(e)=>setEmail(e.target.value)}
                    ></input>
                    </div>
                    <div className="field">
                    <h2>Phone</h2>
                    <input
                        value = {phone}
                        onChange={(e)=>setPhone(e.target.value)}
                    ></input>
                    </div>
                    <div className="field">
                    <h2>Company</h2>
                    <input
                        value = {company}
                        onChange={(e)=>setCompany(e.target.value)}
                    ></input>
                    </div>
                    <div className="field">
                    <h2>Priority</h2>
                    <select value={priority} onChange={(e)=>setPriority(e.target.value)}>
                        <option value="1">Lowest - 1</option>
                        <option value="2">Low - 2</option>
                        <option value="3">Neutral - 3</option>
                        <option value="4">High - 4</option>
                        <option value="5">Highest - 5</option>
                    </select>
                    </div>
                    <div className="field">
                    <h2>Status</h2>
                    <select value={status} onChange={(e)=>setStatus(e.target.value)}>
                        <option value="Lead">Lead</option>
                        <option value="Qualified">Qualified</option>
                        <option value="Proposal">Proposal</option>
                        <option value="Won">Won</option>
                        <option value="Lost">Lost</option>
                    </select>
                    </div>
                    <div className="field">
                    <h2>User Assigned</h2>
                    <select value={assignedTo} onChange={(e)=>setAssignedTo(e.target.value)}>
                        {users.map((user)=>(
                            <option key={user._id} value={user._id}>{user.username}</option>
                        ))}   
                    </select>
                    </div>
                    <div className="field">
                    <h2>Last Interaction</h2>
                    <input type="datetime-local" value={lastcontacted} onChange={(e)=>setLastcontacted(e.target.value)}></input>
                    </div>
                    <div className="field">
                    <h2>Next Follow Up</h2>
                    <input type="datetime-local" value={nextFollowup} onChange={(e)=>setnextFollowup(e.target.value)}></input>
                    </div>    
                    
                </div>
                <div className="modal-actions">
                    <button
                        onClick={()=>{
                            createCustomer();
                        }
                        }
                    >Add</button>
                    <button
                        onClick={()=>setModal(false)}
                    >Go Back</button>
                </div>
                
            </div>
        </div>
        
     );
}
 
export default AddModal;