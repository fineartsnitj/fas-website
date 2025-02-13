import Role from "../models/roleModel.js";

export const createRole = async(req, res)=>{
    try{
        console.log(req.body);
        const {roleName, team} = req.body;
        if(!roleName ||!team){
            return res.status(200).json({message: "Role name and team are required", success: false});
        }
        const newRole = new Role({roleName, team});
        await newRole.save();
        return res.status(201).json({message: "Role created successfully"});
    }
    catch(e){
        console.log(e.message);
        return res.status(500).json({message: e.message});
    }
}