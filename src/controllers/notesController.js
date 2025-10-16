
import { NoteSchema } from '../models/note.js';

export const getNotes = async (req, res) => {
  const notes = await NoteSchema.find();
  res.status(200).json(notes);
};

export const getNoteId = async (req, res) => {
  const { noteId } = req.params;
  const note = await NoteSchema.findById(noteId);

  if (!note) {
    return res.status(404).json({ message: 'Student not found' })
  }

  res.status(200).json(note);
};

export const deleteNote = async (req, res) => {
  const { noteId } = req.params;

  if (!noteId) {
  return res.status(404).json({ message: 'Student not found' })
}

  res.status(200).json(noteId);
};


