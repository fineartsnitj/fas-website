import express from 'express'
import { createRole } from '../controllers/roleController.js';
import { getAllMembers, createMember, updateMember } from '../controllers/memberController.js';
import upload from '../Middleware/multer.js';

const router = express.Router();

router.get('/getAllMembers', getAllMembers);
router.post('/createMember', upload.single('file'), createMember);
router.put("/updateMember/:id", upload.single('file'), updateMember);
router.post('/createRole', createRole);

export default router;
