
import cors from 'cors';
import express from 'express';
import 'dotenv/config';

import { connectMongoDB } from './db/connectMongoDB.js';
import { NoteSchema } from './models/note.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import { logger } from './middleware/logger.js';

import notesRoutes from './routes/notesRoutes.js'

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(logger);
app.use(express.json());
app.use(cors());

// GET /students — список усіх студентів
app.use(notesRoutes);


// Middleware 404
app.use(notFoundHandler);
// Middleware для обробки помилок
app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
