import express from 'express';
import {
    agency99,
    balance,
    balanceAverage,
    close,
    deposit,
    draft,
    highestBalance,
    lowestBalance,
    transfer
} from '../services/account.service.js';

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

router.delete('/', async ({body}, res) => {
    try {
        res.send(await close(body));
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

router.post('/transfer', async ({body}, res) => {
    try {
        res.send(await transfer(body));
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

router.get('/balanceAverage/:agency', async ({params:{agency}}, res) => {
    try {
        res.send(await balanceAverage(agency));
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

router.get('/lowestBalance/:quantity', async ({params:{quantity}}, res) => {
    try {
        res.send(await lowestBalance(quantity));
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

router.get('/highestBalance/:quantity', async ({params:{quantity}}, res) => {
    try {
        res.send(await highestBalance(quantity));
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

router.get('/agency99', async (req, res) => {
    try {
        res.send(await agency99());
    } catch (error) {
        res.status(500).json({error: error.message});
    }
})