import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';

import { TAGS } from '../constants/tags.js';

const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.message('Invalid id format') : value;
};

export const getNoteSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(20).default(10),
  }),
};

export const createNoteSchema = {

  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).required().messages({
      "string.base": "Name must be a string",
      "string.min": "Name should have at least {#limit} characters",
      "any.required": "Name is required",
    }),
    content: Joi.string(),
    tag: Joi.string().valid(...TAGS).required().messages({
      "any.only": "Gender must be one of: male, female, or other",
      "any.required": "Gender is required",
    }),
  }),
};

export const noteIdSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(objectIdValidator).required(),
  }),
};

export const updateNoteSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(objectIdValidator).required(),
  }),
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1),
    content: Joi.string(),
    tag: Joi.string().valid(...TAGS),
  }).min(1),
};

