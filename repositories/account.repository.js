import mongoose from 'mongoose';
import {accountModel} from '../models/account.model.js';

export const db = {
    url: `mongodb+srv://pwneo:puruca2009@cluster0.vziki.mongodb.net/bank?retryWrites=true&w=majority`,
    mongoose: mongoose,
    account: accountModel(mongoose)
};

export const connectDB = async () => {
    try {
        await mongoose.connect(db.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log('Conectando ao banco mongoDB no Atlas');
    } catch (error) {
        console.log(error);
    }
};

export const accountExists = async ({agency, account}) => {
    if (!await db.account.findOne({agency, account})) {
        throw new Error('Account not found')
    }
}