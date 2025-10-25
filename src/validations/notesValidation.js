import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';

// Кастомний валідатор для ObjectId
const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.message('Invalid id format') : value;
};

export const createNoteSchema = {

  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).required().messages({
      "string.base": "Name must be a string",
      "string.min": "Name should have at least {#limit} characters",
      "any.required": "Name is required",
    }),
    content: Joi.string(),
    tag: Joi.string().valid('Work', 'Personal', 'Meeting', 'Shopping', 'Ideas', 'Travel', 'Finance', 'Health', 'Important', 'Todo').required().messages({
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
    title: Joi.string().min(1).required(),
    content: Joi.string(),
    tag: Joi.string().valid('Work', 'Personal', 'Meeting', 'Shopping', 'Ideas', 'Travel', 'Finance', 'Health', 'Important', 'Todo'),
  }).min(1),
};
