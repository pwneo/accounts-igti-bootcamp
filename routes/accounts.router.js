import express from 'express';
import {deposit, draft} from '../services/account.service.js';

export const router = express();

router.post('/deposit', async ({body}, res) => {
    try {
        res.send(await deposit(body));
    } catch (error) {
        res.status(500).json({error: error})
    }
});

router.post('/draft', async ({body}, res) => {
    try {
        res.send(await draft(body));
    } catch (error) {
        res.status(500).json({error: error})
    }
});