
import createHttpError from 'http-errors';
import { NoteSchema } from '../models/note.js';

const notFound404 = createHttpError(404, 'Route not found')

export const getAllNotes = async (req, res) => {

  const { page = 1, perPage = 10 } = req.query;
  const skip = (page - 1) * perPage;
  const notesQuery = NoteSchema.find();

  const [totalNotes, notes] = await Promise.all([
    notesQuery.clone().countDocuments(),
    notesQuery.skip(skip).limit(perPage),
  ]);

  const totalPages = Math.ceil(totalNotes / perPage);
  res.status(200).json({page, perPage, totalNotes, totalPages, notes});
};

export const getNoteById = async (req, res, next) => {
  const { noteId } = req.params;
  const note = await NoteSchema.findById(noteId);

  if (!note) {
    next(notFound404);
    return;
  }

  res.status(200).json(note);
};

export const createNote = async (req, res) => {
  const note = await NoteSchema.create(req.body);
  res.status(201).json(note);
};

export const updateNote = async (req, res, next) => {
  const { noteId } = req.params;

  const note = await NoteSchema.findOneAndUpdate(
    { _id: noteId },
    req.body,
    { new: true },
  );

  if (!note) {
    next(notFound404);
    return;
  }

  res.status(200).json(note);
}

export const deleteNote = async (req, res, next) => {
  const { noteId } = req.params;
  const note = await NoteSchema.findOneAndDelete({_id: noteId,});

  if (!note) {
    next(notFound404);
    return;
  }

  res.status(200).json(note);
};


