import express from 'express';
import {create, findOne, listAll} from '../services/account.service.js';

export const router = express();

router.post('/', async ({body}, res) => {
    try {
        res.send(await create(body));
    } catch (error) {
        res.status(500).json({error: error})
    }
});

router.get('/', async (req, res) => {
    try{
        res.send(await listAll());
    } catch (error) {
        res.status(500).json({error: error})
    }
});
router.get('/:id', async ({params:{id}}, res) => {
    try{
        res.send(await findOne(id));
    } catch (error) {
        res.status(500).json({error: error})
    }
});
router.put('/:id', (req, res) => {

});
router.delete('/:id', (req, res) => {

});
