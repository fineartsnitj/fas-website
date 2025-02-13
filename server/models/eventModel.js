import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    eventName:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    host:{
        type: String,
        default: "Fine Arts Society"
    },
    status:{
        type: String,
        enum: ['upcoming', 'completed'],
        default: 'upcoming'
    },
    pictures:[{
        type: String,
    }],
    winners:[{
        type: String,
    }]
}, {timestamps: true});

const User = mongoose.model('Event', eventSchema);
export default Artwork;