import express from 'express';
import userRouter from './routers/userRouter.js';
import emailRouter from './routers/emailRouter.js';
import authRouter from './routers/auth.js';
import aiRouter from './ai.js';
import cors from 'cors';
import templateRouter from './routers/templateRouter.js';

const app = express();
const port = 5000;

// middlewares
app.use(cors({
    origin: '*'
}));
app.use(express.json());
app.use('/user', userRouter);
app.use('/api/email', emailRouter);
app.use('/api/auth', authRouter);
app.use('/generator', aiRouter); // exposes /email/generate
app.use('/template', templateRouter);

app.get('/', (req, res) => {
    res.send('response from express');
});

// starting the server
app.listen(port, () => {
    console.log('express server has started');
});

