import express from 'express';
import * as service from '../services/account.service.js';
import {validate, accountNotRequiredSchema} from "../helpers/validation.help.js";

export const accountRouter = express();

/*Filter parameters before to send to method's HTPP*/
accountRouter.use(({body}, res, next) => {
    try{
        validate(body, accountNotRequiredSchema);
        next();
    } catch (error){
        res.status(400).json({error: error.message});
    }
});

/*Routes*/
accountRouter.post('/', async ({body}, res, next) => {
    try {
        res.send(await service.create(body));
    } catch (error) {
        next(error);
    }
});

accountRouter.get('/', async (req, res, next) => {
    try {
        res.send(await service.listAll());
    } catch (error) {
        next(error);
    }
});

accountRouter.get('/:id', async ({params}, res, next) => {
    try {
        res.send(await service.findById(params));
    } catch (error) {
        next(error);
    }
});

accountRouter.patch('/:id', async ({body, params}, res, next) => {
    try {
        res.send(await service.update(params, body));
    } catch (error) {
        res.status(500).json({error: error})
    }
});

accountRouter.post('/deposit', async ({body}, res, next) => {
    try {
        res.send(await service.deposit(body));
    } catch (error) {
        res.status(500).json({error: error})
    }
});

accountRouter.post('/withdraw', async ({body}, res, next) => {
    try {
        res.send(await service.draft(body));
    } catch (error) {
        next(error);
    }
});

accountRouter.post('/balance', async ({body}, res, next) => {
    try {
        res.send(await service.balance(body));
    } catch (error) {
        next(error);
    }
});

accountRouter.delete('/', async ({body}, res, next) => {
    try {
        res.send(await service.close(body));
    } catch (error) {
        next(error);
    }
});

accountRouter.post('/transfer', async ({body}, res, next) => {
    try {
        res.send(await service.transfer(body));
    } catch (error) {
        next(error);
    }
});

accountRouter.post('/balanceAverage', async ({body:{agency}}, res, next) => {
    try {
        res.send(await service.balanceAverage(agency));
    } catch (error) {
        next(error);
    }
});

accountRouter.post('/lowestBalance', async ({body:{quantity}}, res, next) => {
    try {
        res.send(await service.lowestBalance(quantity));
    } catch (error) {
        next(error);
    }
});

accountRouter.post('/highestBalance', async ({body:{quantity}}, res, next) => {
    try {
        res.send(await service.highestBalance(quantity));
    } catch (error) {
        next(error);
    }
});

accountRouter.get('/agency99', async (req, res, next) => {
    try {
        res.send(await service.agency99());
    } catch (error) {
        next(error);
    }
});

/*Handle errors of the operations*/
accountRouter.use(({message}, {method, baseUrl}, response, next) => {
    response.status(500).send({ error: message });
});