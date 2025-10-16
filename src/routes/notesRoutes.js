
import { Router } from 'express';
import { getNotes, getNoteId, deleteNote } from '../controllers/notesController.js';

const router = Router();

router.get('/notes', getNotes);
router.get('/notes/:noteId', getNoteId);

// router.post('notes', postNote);
// router.patch('/notes/:noteId');
router.delete('/notes/:noteId', deleteNote);

export default router;
