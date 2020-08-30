import express from 'express';
import {router} from './routes/accounts.router.js';
import {connectDB} from "./repositories/account.repository.js";

connectDB();

const app = express();
const port = 3000;

app.use(express.json());
app.use('/accounts', router);

app.listen(port, () =>{
    console.log('API Iniciada');
});
