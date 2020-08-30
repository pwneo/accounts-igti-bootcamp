import express from 'express';
import {create} from '../services/account.service.js';

export const router = express();

router.post('/', async ({body}, res) => {
    try {
        const result = await create(body);
        res.send(result);
    } catch (error) {
        res.status(500).json({error: error})
    }
});

router.get('/', (req, res) => {

});
router.get('/:id', (req, res) => {

});
router.put('/:id', (req, res) => {

});
router.delete('/:id', (req, res) => {

});
