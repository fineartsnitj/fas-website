import User from "../models/userModel.js";
import cloudinary from 'cloudinary';

async function uploadFileToCloudinary(file, folder, quality) {
    console.log(public_id);
    const options = { folder};
    
    options.resource_type = "image";
    if (quality) {
        options.quality = quality;
    }
    return await cloudinary.uploader.upload(file.path, options);
};

export const getAllMembers = async (req, res) => {
    try {
        const {keyword, page, pageSize} = req.query;
        const skip = pageSize * (page - 1);

        const query = { membername: {$regex: keyword, $options: "i" }};
        const members = await User.find(query, { membername: true, profileImage: true, username: true}).limit(pageSize).skip(skip).populate({path: 'role1'}).populate({path: 'role2'}).populate({path: 'role3'});
        res.status(200).json({ members: members, success: true });
    }
    catch (e) {
        res.status(500).json({ message: e.message, success: false });
    }
}


export const getMemberByUsername = async (req, res) => {
    try {
        const member = await User.findOne({username: req.params.username});
        if (!member) {
            return res.status(200).json({ message: "User not found", success: false });
        }
        res.status(200).json({ member: member, success: true });
    }
    catch (e) {
        res.status(500).json({ message: e.message, success: false });
    }
}

export const createMember = async (req, res) => {
    try {
        console.log(req);
        const { username, email, password, isAdmin, isActive, roles, year, bio, instagram, domains} = req.body;
        
        if (!username || !email) {
            return res.status(200).json({ message: "All fields are required", success: false });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(200).json({ message: "User with this email already exists", success: false });
        }
        
        const file = req.file;
        var profileImage;
        if(file){
            const response = await uploadFileToCloudinary(file, "Test");
            profileImage = response.secure_url;
        }
        const newMember = new User({ username, email, password, isAdmin, isActive, roles, year, bio, instagram, domains, profileImage });
        await newMember.save();
        res.status(201).json({ message: "Member created successfully", success: true });
    }
    catch (e) {
        res.status(500).json({ message: e.message, success: false });
    }

}


export const removeMemberRole = async (req, res) => {
    try {
        const member = await User.findByIdAndUpdate(req.params.id, { $pull: { roles: req.params.roleId } }, { new: true });
        if (!member) {
            return res.status(200).json({ message: "User not found", success: false });
        }
        res.status(200).json({ member: member, success: true });
    }
    catch (e) {
        res.status(500).json({ message: e.message, success: false });
    }
}

export const addMemberRole = async(req, res) => {
    try {
        const member = await User.findByIdAndUpdate(req.params.id, { $push: { roles: req.params.roleId } }, { new: true });
        if (!member) {
            return res.status(200).json({ message: "User not found", success: false });
        }
        res.status(200).json({ member: member, success: true });
    }
    catch (e) {
        res.status(500).json({ message: e.message, success: false });
    }
}

export const updateMember = async (req, res) => {
    try {
        const file = req.file;
        const { username, password, isAdmin, isActive, roles, year, bio, instagram, domains} = req.body;
        const temp = await User.findById(req.params.id);
        const email = temp.email;
        console.log(email);
        var profileImage
        if(file){
            var response;
            if(temp.profileImage=="default.jpg"){
                response = await uploadFileToCloudinary(file, "Profiles");
            }
            else{
                const public_id = temp.profileImage.split("/").slice(-1)[0].split(".")[0];
                const resp = await cloudinary.uploader.destroy(public_id);
                response = await cloudinary.uploader.upload(file.path, {public_id, invalidate: true, overwrite: true});
            }
            profileImage = response.secure_url;
        }
        const updatedMember = await User.findByIdAndUpdate(req.params.id, { username, email, password, isAdmin, isActive, roles, year, bio, instagram, domains, profileImage }, { new: true });
        if (!updatedMember) {
            return res.status(200).json({ message: "User not found", success: false });
        }
        res.status(200).json({ member: updatedMember, success: true });
    }
    catch (e) {
        res.status(500).json({ message: e.message, success: false });
    }
}





