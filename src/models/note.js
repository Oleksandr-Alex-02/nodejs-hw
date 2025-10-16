
import { Schema } from 'mongoose';
import { model } from 'mongoose';

const noteSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  tag: {
    type: String,
    timestamps: true,
    enum: ['Work', 'Personal', 'Meeting', 'Shopping', 'Ideas', 'Travel', 'Finance', 'Health', 'Important', 'Todo'],
  },
});

export const NoteSchema = model('Note', noteSchema);

