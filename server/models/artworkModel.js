import mongoose from "mongoose";

const artworkSchema = new mongoose.Schema({
    artworkName:{
        type: String,
        required: true
    },
    description:{
        type: String,
    },
    imageurl:{
        type: String,
        required: true
    },
    artists:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    categories:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }],
    price:{
        type: Number,
        required: true,
        default: 0
    },
    isFASArtwork:{
        type: Boolean,
        required: true,
        default: false
    }

}, {timestamps: true});

const User = mongoose.model('Artwork', artworkSchema);
export default Artwork;