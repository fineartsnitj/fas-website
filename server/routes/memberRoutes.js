import express from 'express'
import { createRole, getAllRoles } from '../controllers/roleController.js';
import { getAllMembers, createMember, updateMember, getMemberByUsername } from '../controllers/memberController.js';
import upload from '../Middleware/multer.js';

const router = express.Router();

router.get('/getAllMembers', getAllMembers);
router.post('/createMember', upload.single('file'), createMember);
router.get('/getMemberByUsername/:username', getMemberByUsername);
router.put("/updateMember/:id", upload.single('file'), updateMember);
router.post('/createRole', createRole);
router.get('/getAllRoles', getAllRoles);

export default router;
