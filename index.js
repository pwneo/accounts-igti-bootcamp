import express from 'express';
import {accountRouter} from './routes/account.route.js';
import {connectDB} from "./repositories/account.repository.js";
import axios from 'axios';

axios();

connectDB();

const app = express();
const port = 3000;

app.use(express.json());
app.use('/accounts', accountRouter);

app.listen(port, () =>{
    console.log('API Iniciada');
});
