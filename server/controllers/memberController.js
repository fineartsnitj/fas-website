import User from "../models/userModel";

export const getAllMembers = async(req, res) =>{
    try{
        const members = await User.find();
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
            return res.status(404).json({message: "User not found", success: false});
        }
        res.status(200).json({member: member, success: true});
    }
    catch(e){
        res.status(500).json({message: e.message, success: false});
    }
}