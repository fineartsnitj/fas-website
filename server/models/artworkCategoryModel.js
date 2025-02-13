import mongoose from "mongoose";

const artworkCategorySchema = new mongoose.Schema({
    category:{
        type: String,
        required: true
    },
    description:{
        type: String
    },
    artworks:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artwork'
    }],
});

const User = mongoose.model('ArtworkCategory', artworkCategorySchema);
export default User;