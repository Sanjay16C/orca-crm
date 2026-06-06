import { useEffect, useState } from "react";
import api from "../api/axios.js";
import { useNavigate, useParams } from "react-router-dom";
import "./Notes.css"
const Notes = () => {
    const [customer,setCustomer] = useState({});
    const {id,workspaceId} = useParams();
    const [title,setTitle] = useState("");
    const [content,setContent] = useState("");
    const [editId,setEditId] = useState(null);
    const [editTitle,setEditTitle] = useState("");
    const [editContent,setEditContent] = useState("");
    const [myRole,setMyRole] = useState("");
    const navigate = useNavigate();
    const fetchOneCustomer = async() =>{
        try {
            const response = await api.get(`/customer/${workspaceId}/${id}`);
            setCustomer(response.data.customer);
        } catch (error) {
            console.log(error?.response?.message || error.message);
        }
    }
    const handleAddNote = async() =>{
        try {
            const response = await api.post(`/customer/${id}/notes`,{title,content,workspaceId});
            setTitle("");
            setContent("");
            setCustomer(response.data.customer);
        } catch (error) {
            console.log(error?.response?.message || error.message);
        }
    }
    const handleUpdateNote = async(noteId) =>{
        try {
            const response = await api.patch(`/customer/${id}/notes/${noteId}`,{
                title : editTitle,
                content : editContent,
                workspaceId
            });
            setCustomer(response.data.customer);
            setEditId(null);
        } catch (error) {
            console.log(error?.response?.message || error.message);
        }
    }
    const handleDeleteNote = async(noteId) =>{
        try {
            const confirmDelete = window.confirm(
                "Delete this note?"
            );
            if(!confirmDelete) return;
            const response = await api.delete(`/customer/${workspaceId}/${id}/notes/${noteId}`);
            setCustomer(response.data.customer);
        } catch (error) {
            console.log(error?.response?.message || error.message);
        }
    }
    const startEdit = (note) =>{
        setEditId(note._id);
        setEditTitle(note.title);
        setEditContent(note.content);
    }
    const handleBack = () =>{
        navigate(`/workspace/${workspaceId}`);
    }
    const fetchRole = async() =>{
        try {
            const response = await api.get(`/workspace/getMembership/${workspaceId}`);
            setMyRole(response.data.role);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
    fetchOneCustomer();
    fetchRole();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return ( 
        <div className="notes">
            <button className="back-btn" 
                onClick={()=>handleBack()}
            >← Back</button>
            <h1>{customer.name}'s Notes</h1>
            
            <div className="add-note">
                
                <input 
                    placeholder="Title"
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}
                />
                <textarea 
                    placeholder="Content"
                    value={content}
                    onChange={(e)=>setContent(e.target.value)}
                />
                <div className="note-add-btn-div">
                    <button className="note-add-btn"
                        onClick={()=>handleAddNote()}
                    >Add</button>
                </div>
                
            </div>
            
            <div className="notes-list">
                {
                    customer?.notes?.map((note)=>(
                        (editId === note._id)
                        ?
                        (
                            <div className="editnote" key={note._id}>
                                <input 
                                    placeholder={note.title}
                                    value={editTitle}
                                    onChange={(e)=>setEditTitle(e.target.value)}
                                />
                                <textarea 
                                    placeholder={note.content}
                                    value={editContent}
                                    onChange={(e)=>setEditContent(e.target.value)}
                                />
                                <div className="stamp-options">
                                    <div className="note-options">
                                        <button
                                        onClick={()=>handleUpdateNote(note._id)}
                                        >Save</button>
                                        <button
                                            onClick={()=>setEditId(null)}
                                        >Cancel</button>
                                    </div>
                                    
                                </div>
                                
                            </div>
                        )
                        :
                        (
                            <div className="note" key={note._id}>
                                <h2>{note.title}</h2>
                                <p>{note.content}</p>
                                <div className="stamp-options">
                                    <h4>{new Date(note.createdAt).toISOString().slice(0,16).replace('T'," ")}</h4>
                                    { myRole!=="member" && <div className="note-options">
                                        <button
                                            onClick={()=>startEdit(note)}
                                        >Edit</button>
                                        <button
                                            onClick={()=>handleDeleteNote(note._id)}
                                        >Delete</button>
                                    </div>
                                    }
                                </div>
                                
                            </div>
                        )
                    ))
                }
            </div>
            
        </div>
     );
}
 
export default Notes;