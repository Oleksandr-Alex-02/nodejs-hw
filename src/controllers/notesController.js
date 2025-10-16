
import createHttpError from 'http-errors';
import { NoteSchema } from '../models/note.js';

export const getAllNotes = async (req, res) => {
  const notes = await NoteSchema.find();
  res.status(200).json(notes);
};

export const getNoteById = async (req, res, next) => {
  const { noteId } = req.params;
  const note = await NoteSchema.findById(noteId);

  if (!note) {
    next(createHttpError(404, 'Route not found'));
    return;
  }

  res.status(200).json(note);
};

export const createNote = async (req, res) => {
  const note = await NoteSchema.create(req.body);
  res.status(201).json(note);
};

export const deleteNote = async (req, res, next) => {
  const { noteId } = req.params;
  const note = await NoteSchema.findOneAndDelete({_id: noteId,});

  if (!note) {
    next(createHttpError(404, "Student not found"));
    return;
  }

  res.status(200).json(note);
};


