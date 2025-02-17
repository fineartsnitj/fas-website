import User from "../models/userModel.js";

export const getAllMembers = async (req, res) => {
    try {
        const members = await User.find({}, { username: true }).populate({
            path: "roles",
        });
        res.status(200).json({ members: members, success: true });
    }
    catch (e) {
        res.status(500).json({ message: e.message, success: false });
    }
}


export const getMemberById = async (req, res) => {
    try {
        const member = await User.findById(req.params.id);
        if (!member) {
            return res.status(200).json({ message: "User not found", success: false });
        }
        res.status(200).json({ member: member, success: true });
    }
    catch (e) {
        res.status(500).json({ message: e.message, success: false });
    }
}


export const getMemberByNameSearch = async (req, res) => {
    try {
        const member = await User.find({ username: { $regex: req.params.name, $options: "i" } }).limit(100);
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
        const { username, email, password, isAdmin, isActive, roles, year, bio, instagram, domains } = req.body;
        if (!username || !email) {
            return res.status(200).json({ message: "All fields are required", success: false });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(200).json({ message: "User with this email already exists", success: false });
        }
        const newMember = new User({ username, email, password, isAdmin, isActive, roles, year, bio, instagram, domains });
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
        const updatedMember = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedMember) {
            return res.status(200).json({ message: "User not found", success: false });
        }
        res.status(200).json({ member: updatedMember, success: true });
    }
    catch (e) {
        res.status(500).json({ message: e.message, success: false });
    }
}





