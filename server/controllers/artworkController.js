import Artwork from "../models/artworkModel";

export const getAllArtworks = async(req, res) => {
    try {
        const artworks = await Artwork.find({});
        res.json({artworks: artworks, success: true});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

export const getArtworkById = async(req, res) =>{
    try {
        const artwork = await Artwork.findById(req.params.id);
        if (!artwork)
             return res.status(200).json({ message: "Artwork not found" , success: false });
        res.json({artwork:artwork, success: true});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

export const createArtwork = async(req, res) =>{
    const artwork = new Artwork(req.body);
    try {
        await artwork.save();
        res.status(201).json({ messae: "Artwork added", success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}