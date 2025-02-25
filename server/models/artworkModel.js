import mongoose from "mongoose";

const artworkSchema = new mongoose.Schema({
    artworkNo:{
        type: Number,
        required: true,
        unique: true,
        default: 1
    },
    artworkName:{
        type: String,
        required: true
    },
    description:{
        type: String,
    },
    imageurl:{
        type: String,
        required: true,
        default: "broken"
    },
    artists:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    categories:{
        type: String,
        // set: (value) => value?.toUpperCase()
    },
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

const Artwork = mongoose.model('Artwork', artworkSchema);
export default Artwork;