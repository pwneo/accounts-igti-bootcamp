import express from 'express';
import {accountRouter} from './routes/account.route.js';
import {connectDB} from "./repositories/account.repository.js";
import cors from 'cors';

const port = 3000;
const app = express();

app.use(express.json());
app.use(cors());
connectDB();

app.use('/accounts', accountRouter);

app.listen(port, () =>{
    console.log('API Iniciada');
});
