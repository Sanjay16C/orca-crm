import { useEffect,useState } from "react";
import api from "../api/axios.js";
import "./Table.css";
import EditModal from "./EditModal.js";
import { useNavigate } from "react-router-dom";
import phone from "../assets/app-icons/phone.png";
import info from "../assets/app-icons/info.png";
import edit from "../assets/app-icons/edit.png";
import bin from "../assets/app-icons/bin.png";

const Table = ({customer,setCustomer,users,setUsers}) => {
    const [editModal,setEditModal] = useState(false);
    const [oneCust,setoneCust] = useState({});
    const navigate = useNavigate();
    const fetchdata = async() =>{
        try {
        const response = await api.get("/customer/getall"); 
        setCustomer(response.data.customers);
        } catch (error) {
            console.log(error.message);
        }
    }
    useEffect(()=>{
        fetchdata();
    },[]);
    const handleDelete = async(id) =>{
        try {
            const confirmDelete = window.confirm(
                "Delete this customer?"
            );
            if(!confirmDelete) return;
            await api.delete(`/customer/delete/${id}`);
            setCustomer((ele)=>ele.filter((cust)=>cust._id!==id));
        } catch (error) {
            console.log(error?.response || error.message);
        }
    }
    const handleInfo = (id) =>{
        navigate(`/home/customer/${id}/notes`);
    }
    
    
    return ( 
        <div className="table">
            {editModal && <EditModal editModal={editModal} setEditModal={setEditModal} 
                oneCust={oneCust} setoneCust={setoneCust}
                customer={customer} setCustomer={setCustomer}
                users={users} setUsers={setUsers}
            />}
            <div className="table-container">
                    <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Company</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th>Notes</th>
                        <th>Assigned to</th>
                        <th>Last Interaction</th>
                        <th>Follow Up</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {customer.map((customer)=>(
                        <tr key={customer._id}>

                            <td>{customer.name}</td>
                            <td>{customer.email}</td>
                            <td>
                                <div className="phone-field">
                                    {customer.phone}
                                    <a href={`tel:${customer.phone}`}>
                                        <button
                                            className="icon-btn"
                                        >
                                            <img src={phone} />
                                        </button>
                                    </a>
                                </div>
                            </td>
                            <td>{customer.company}</td>
                            <td>{customer.priority}</td>
                            <td>{customer.status}</td>
                            <td>
                                <button
                                    className="icon-btn"
                                    onClick={()=>handleInfo(customer._id)}
                                >
                                    <img src={info} />
                                </button>
                            </td>
                            <td>{customer.assignedTo?.username}</td>
                            <td>{
                                    customer.lastcontacted
                                    ? new Date(customer.lastcontacted).toISOString().slice(0,16).replace("T","@")
                                    :""
                                }</td>
                            <td>{customer.nextFollowup
                                    ? new Date(customer.nextFollowup).toISOString().slice(0,16).replace("T","@")
                                    :""
                                }</td>
                            <td>
                                    <div className="option-btn">
                                    <button
                                        className="icon-btn"
                                        onClick={()=>{
                                            setEditModal(true);
                                            setoneCust(customer);
                                        }
                                        }
                                    >
                                        <img src={edit} />
                                    </button>
                                    <button
                                        className="icon-btn"
                                        onClick={()=>handleDelete(customer._id)}
                                    >
                                        <img src={bin} />
                                    </button>
                                    </div>
                                    
                                
                            </td>
                            
                        </tr>
                    ))}
                    
                </tbody>
            </table>
            </div>
            
        </div>
     );
}
 
export default Table;