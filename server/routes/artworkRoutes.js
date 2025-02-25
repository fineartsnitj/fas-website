import express from 'express'
import upload from '../Middleware/multer.js';
import { deleteArtistFromArtwork, addArtistToArtwork, createArtwork, deleteArtwork, getAllArtworks, getArtworkByNo, updateArtwork } from '../controllers/artworkController.js';

const router = express.Router();

router.get('/getAllArtworks', getAllArtworks);
router.post('/createArtwork', upload.single('file'), createArtwork);
router.get('/getMemberByNo/:artworkNo', getArtworkByNo);
router.put("/updateArtwork/:id", upload.single('file'), updateArtwork);
router.post('/deleteArtwork/:id', deleteArtwork);
router.get('/addArtistToArtwork/:id/:artistId', addArtistToArtwork);
router.get('/deleteArtistFromArtwork/:id/:artistId', deleteArtistFromArtwork);

export default router;
