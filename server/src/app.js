import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth-routes.js';
import contactsRoutes from './routes/contacts-routes.js';
import statusesRoutes from './routes/statuses-routes.js';

const app = express();

const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/contacts', contactsRoutes);
app.use('/api/statuses', statusesRoutes);

export default app;
