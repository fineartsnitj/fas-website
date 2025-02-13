import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
    roleName:{
        type: String,
        required: true,
        enum:['Member', 'Assistant Coordinator', 'Head', 'Co-Head'],
        default: "Member"
    },
    team:{
        type: String,
        required: true,
        default: "Event Management",
        enum:['Event Management', 'Management', 'Public Relations', 'Social Media', 'Content Creation', 'Poster Making', 'Web Development', 'Club']
    }
});

const User = mongoose.model('Role', roleSchema);
export default Artwork;