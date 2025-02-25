import mongoose from "mongoose";
import mongooseSequence from 'mongoose-sequence'

const AutoIncrement = mongooseSequence(mongoose);

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
        required: true,
        default: "broken"
    },
    artists:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    categories:{
        type: String,
        set: (value) => value?.toUpperCase()
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

artworkSchema.plugin(AutoIncrement, {inc_field: 'artworkNo'});

const Artwork = mongoose.model('Artwork', artworkSchema);
export default Artwork;