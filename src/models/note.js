
import { Schema } from 'mongoose';
import { model } from 'mongoose';
import { TAGS } from '../constants/tags.js';

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
    enum: TAGS,
  },
});

export const NoteSchema = model('Note', noteSchema);
