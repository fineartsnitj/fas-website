import express from 'express'
import { createRole } from '../controllers/roleController.js';
import { getAllMembers, createMember } from '../controllers/memberController.js';

const router = express.Router();

router.get('/getAllMembers', getAllMembers);
router.post('/createMember', createMember);
router.post('/createRole', createRole);

export default router;
