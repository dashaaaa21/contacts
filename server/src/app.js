import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth-routes.js';
import contactsRoutes from './routes/contacts-routes.js';
import statusesRoutes from './routes/statuses-routes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/contacts', contactsRoutes);
app.use('/api/statuses', statusesRoutes);

export default app;
