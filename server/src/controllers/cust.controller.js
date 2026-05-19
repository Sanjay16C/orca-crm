import { Cust } from "../models/cust.model.js";


const addCustomer = async(req,res) => {
    try {
        const {name,email,phone,company,priority,status,assignedTo,lastcontacted,nextFollowup} = req.body;
        const exists = await Cust.findOne({email});
        if(exists) return res.status(400).json({
            message : "Duplicate Customer entry with same Email"
        }) 
        const cust = await Cust.create(
            {name,email,phone,company,priority,status,assignedTo,lastcontacted,nextFollowup} 
        );
        await cust.populate("assignedTo");
        res.status(201).json({
            message : "New Customer Created !!!" , cust
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message : "Internal server error"
        })
    }
}

const getAllCustomers = async(req,res) =>{
    try {
        const customers = await Cust.find().populate("assignedTo");
        res.status(200).json({
            message : "Customer fetched!!" , customers
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message : "Internal server error"
        })
    }
}

const updateCustomer = async(req,res) =>{
    try {
        const id = req.params.id;
        const customer  = await Cust.findByIdAndUpdate(
            id,req.body,{returnDocument:"after"}).populate("assignedTo");
        res.status(200).json({
            message : "Updated successfully" , customer
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message : "Internal server error"
        })
    }
}

const deleteCustomer = async(req,res) =>{
    try {
        const id = req.params.id;
        const deleted = await Cust.findByIdAndDelete(id);
        if(!deleted) return res.status(400).json({
            message : "Id is not Valid"
        })
        res.status(200).json({
            message : "Customer deleted!!" , deleted
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message : "Internal server error"
        })
    }
}

const getOneCustomer = async(req,res)=>{
    try {
        const id = req.params.id;
        const customer = await Cust.findById(id);
        if(!customer) return res.status(404).json({
            message : "No Customer Found"
        })
        res.status(200).json({
            message : "One Customer Fetched" , customer
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message : "Internal server error"
        })
    }
}

const addNote = async(req,res) =>{
    try {
        const {title,content} = req.body||{};
        if(!title || !content){
            return res.status(400).json({
                message:"Title and content required"
            });
}
        const customer = await Cust.findById(req.params.id);
        if(!customer) return res.status(404).json({
            message : "Customer Not found"
        })
        customer.notes.push({
            title,content
        });
        await customer.save();
        res.status(201).json({
            message : "Notes created" , customer
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message : "Internal server error"
        })
    }
}

const deleteNote = async(req,res) =>{
    try {
        const {custId,noteId} = req.params;
        const customer = await Cust.findById(custId);
        if(!customer) return res.status(404).json({
            message : "Customer Not found"
        })
        console.log(customer.notes);
        const note = customer.notes.id(noteId);
        if(!note) return res.status(404).json({
            message : "Note Not Found"
        })
        note.deleteOne();
        await customer.save();
        res.status(200).json({
            message : "Note Deleted" , customer
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message : "Internal server error"
        })
    }
}

// url = /customer/:id/notes/:id
const updateNote = async(req,res) =>{
    try {
        const {custId,noteId} = req.params || {};
        const customer = await Cust.findById(custId);
        if(!customer) return res.status(404).json({
            message : "Customer Not found"
        })
        const note = customer.notes.id(noteId);
        if(!note) return res.status(404).json({
            message : "Note Not Found"
        })
        const {title,content} = req.body;
        note.title = title;
        note.content = content;
        await customer.save();
        res.status(200).json({
            message : "Note updated successfully" ,customer
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message : "Internal server error"
        })
    }
}

export {
    addCustomer,
    getAllCustomers,
    updateCustomer,
    deleteCustomer,
    getOneCustomer,
    addNote,
    deleteNote,
    updateNote
}