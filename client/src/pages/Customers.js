import AddModal from "../components/AddModal.js";
import Table from "../components/Table.js";
import { useState,useEffect } from "react";
import api from "../api/axios.js";
import "./Customers.css";
import { useParams } from "react-router-dom";
const Customers = () => {
    const [modal,setModal] = useState(false);
    const [customer,setCustomer] = useState([]);
    const [users,setUsers] = useState([]);
    const {workspaceId} = useParams();
    const fetchUsers = async() =>{
        try {
            const response = await api.get(`/auth/fetchusers/${workspaceId}/users`); 
            setUsers(response.data.members.map((member)=>member.user));
            } catch (error) {
                console.log(error.message);
            }
        }
    useEffect(()=>{
        fetchUsers();
        // eslint-disable-next-line
    },[workspaceId]);
    return ( 
        <div className="customers-page">
                <div className="table-home">
                            <div className="table-header">
                                <h2>Customer Info</h2>
                                <button id="add-btn"
                                onClick={()=>
                                    setModal(true)
                                }
                                >+ Add New Customer</button>
                                {/* AddModal */}
                                {modal && <AddModal setModal={setModal} 
                                customer = {customer} setCustomer={setCustomer}
                                users={users} setUsers={setUsers}
                                />}
                            </div>
                            
                            <div className="table-main">
                                {/* Table Component */}
                                <Table customer={customer} setCustomer={setCustomer}
                                    users={users} setUsers={setUsers}
                                />
                            </div>

                            
                        </div>
        </div>
     );
}
 
export default Customers;