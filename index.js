import express from 'express';
import {accountRouter} from './routes/account.route.js';
import {connectDB} from "./repositories/account.repository.js";
import cors from 'cors';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.use('/accounts', accountRouter);

app.listen(port, () =>{
    connectDB();
    console.log('API Iniciada');
});
