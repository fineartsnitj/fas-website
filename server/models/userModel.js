import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    membername:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        default: 'password',
    },
    isAdmin:{
        type: Boolean,
        default: false,
        required: true
    },
    isActive:{
        type: Boolean,
        default: true,
        required: true
    },
    profileImage:{
        type: String,
        default: 'default.jpg'
    },
    roles:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role'
    }],
    year:{
        type: Number,
        default: 2028
    },
    bio:{
        type: String
    },
    instagram:{
        type: String
    },
    domains:[{
        type: String,
        required: true
    }]
}, {timestamps: true});

const User = mongoose.model('User', userSchema);
export default User;