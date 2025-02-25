import Artwork from "../models/artworkModel.js";
import User from "../models/userModel.js";
import cloudinary from 'cloudinary';

async function uploadFileToCloudinary(file, folder, quality) {
    const options = { folder };

    options.resource_type = "image";
    if (quality) {
        options.quality = quality;
    }
    return await cloudinary.uploader.upload(file.path, options);
};

export const getAllArtworks = async (req, res) => {
    try {
        const {keyword, page, pageSize} = req.query;
        console.log(keyword, page, pageSize);
        const skip = pageSize * (page - 1);
        const query = { artworkName: {$regex: keyword, $options: "i" }};
        const artworks = await Artwork.find(query).skip(skip).limit(pageSize).populate({path: 'artists'});
        res.json({ artworks: artworks, success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

export const getArtworkByNo = async (req, res) => {
    try {
        const artwork = await Artwork.findOne({ artworkNo: req.params.artworkNo });
        if (!artwork)
            return res.status(200).json({ message: "Artwork not found", success: false });
        res.json({ artwork: artwork, success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

export const createArtwork = async (req, res) => {
    const { artworkName, description, artiststr, categories, price, isFASArtwork } = req.body;
    const file = req.file;
    try {
        if (!artworkName || !file) {
            return res.status(200).json({ message: "Artwork name and image are required", success: false });
        }

        // const response = await uploadFileToCloudinary(file, "Artwork");
        const imageurl = "j"; //= response.secure_url;
        
        const artists = artiststr.split(",");
        // console.log(artists);
        const latestArtwork = await Artwork.findOne().sort({ createdAt: -1 });
        const artworkNo = latestArtwork? latestArtwork.artworkNo + 1 : 1001; // TODO: Generate unique artworkNo
        const newArtwork = new Artwork({artworkNo, artworkName, description, artists, categories, price, isFASArtwork, imageurl });
        await newArtwork.save();
        if (artists) {
            await Promise.all(artists?.map(async (element) => {
                const user = await User.findById(element);
                if (user) {
                    user.artworks.push(newArtwork._id);
                    await user.save();
                }
            }));
        }
        res.status(201).json({ messae: "Artwork added", success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

export const updateArtwork = async (req, res) => {
    const { artworkName, description, categories, price, isFASArtwork } = req.body;
    const file = req.file;
    try {
        const artwork = await Artwork.findByIdAndUpdate(req.params.id, { artworkName, description, categories, price, isFASArtwork }, { new: true });
        if (!artwork) {
            return res.status(200).json({ message: "Artwork not found", success: false });
        }
        if (file) {
            const response = await uploadFileToCloudinary(file, "Artwork", 70);
            artwork.imageurl = response.secure_url;
            await artwork.save();
        }
        res.status(200).json({ artwork: artwork, success: true });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

export const deleteArtwork = async (req, res) => {
    try {
        const artwork = await Artwork.findByIdAndDelete(req.params.id);
        if (!artwork) {
            return res.status(200).json({ message: "Artwork not found", success: false });
        }
        res.status(200).json({ message: "Artwork deleted successfully", success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

export const addArtistToArtwork = async (req, res) => {
    try {
        const artwork = await Artwork.findByIdAndUpdate(req.params.id, { $push: { artists: req.params.artistId } }, { new: true });
        if (!artwork) {
            return res.status(200).json({ message: "Artwork not found", success: false });
        }
        const user = await User.findById(req.params.artistId);
        if (user) {
            if (!user.artworks.includes(artwork._id)) {
                user.artworks.push(artwork._id);
                await user.save();
            }
        }
        res.status(200).json({ message: "Artist added to artwork successfully", success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

export const deleteArtistFromArtwork = async (req, res) => {
    try {
        const artwork = await Artwork.findByIdAndUpdate(req.params.id, { $pull: { artists: req.params.artistId } }, { new: true });
        if (!artwork) {
            return res.status(200).json({ message: "Artwork not found", success: false });
        }
        const user = await User.findById(req.params.artistId);
        if (user) {
            user.artworks = user.artworks.filter((id) => id.toString() !== req.params.id);
            await user.save();
        }
        res.status(200).json({ message: "Artist deleted from artwork successfully", success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}