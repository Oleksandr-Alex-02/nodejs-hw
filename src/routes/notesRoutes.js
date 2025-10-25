
import { Router } from 'express';
import { celebrate } from 'celebrate';

import { createNoteSchema, noteIdSchema, updateNoteSchema } from '../validations/notesValidation.js';
import { getAllNotes, getNoteById, deleteNote, createNote, updateNote } from '../controllers/notesController.js';

const router = Router();

router.get('/notes', getAllNotes);
router.get('/notes/:noteId', celebrate(noteIdSchema), getNoteById);

router.post('/notes', celebrate(createNoteSchema), createNote);
router.patch('/notes/:noteId', celebrate(updateNoteSchema), updateNote);

router.delete('/notes/:noteId', celebrate(createNoteSchema), deleteNote);

export default router;
