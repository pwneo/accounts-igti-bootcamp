import express from 'express';
import {balance, deposit, draft} from '../services/account.service.js';

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

router.post('/balance', async ({body}, res) => {
    try {
        res.send(await balance(body));
    } catch (error) {
        res.status(500).json({error: error})
    }
});