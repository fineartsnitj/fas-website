import User from "../models/userModel.js";

export const getAllMembers = async(req, res) =>{
    try{
        const members = await User.find({}, {username: true}).populate({
            path: "roles",
        });
        res.status(200).json({members: members, success: true});
    }
    catch(e){
        res.status(500).json({message: e.message, success: false});
    }
}


export const getMemberById = async(req, res) =>{
    try{
        const member = await User.findById(req.params.id);
        if(!member){
            return res.status(200).json({message: "User not found", success: false});
        }
        res.status(200).json({member: member, success: true});
    }
    catch(e){
        res.status(500).json({message: e.message, success: false});
    }
}


export const getMemberByNameSearch = async(req, res) =>{
    try{
        const member = await User.find({username: {$regex: req.params.name, $options: "i"}}).limit(100);
        if(!member){
            return res.status(200).json({message: "User not found", success: false});
        }
        res.status(200).json({member: member, success: true});
    }
    catch(e){
        res.status(500).json({message: e.message, success: false});
    }
}

