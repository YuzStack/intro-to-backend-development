import express from 'express';

// Route imports
import userRouter from './routes/user.route.js';

const app = express(); // Create an express app

app.use(express.json()); // Parse all json data coming from the client

// Router declaration
app.use('/api/v1/users', userRouter);

// Route Example: https://localhost:4000/api/v1/users/register

export default app;
