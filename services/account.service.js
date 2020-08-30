import {db} from '../repositories/account.repository.js'

const Account = db.account;

export const deposit = async ({agency, account, value}) => {
    try {
        await Account.findOneAndUpdate({agency, account}, {$inc:{balance: value}});
        const accountResult =  await Account.findOne({agency, account});
        return {balance: accountResult.balance};
    } catch (error) {
        return {error: error.message};
    }
}

export const draft = async ({agency, account, value}) => {
    try {
        const accountFound = await Account.findOne({agency, account});

        if ((value + 1) > accountFound.balance || value <= 0){
            throw new Error('Não possível realizar o saque');
        }

        await Account.findOneAndUpdate(
        {$and:[ {agency, account}, {balance: {$gte: (value + 1)}} ]},
        {$inc:{balance: - (value + 1)}}
        );

        const accountResult =  await Account.findOne({agency, account});
        return {balance: accountResult.balance};
    } catch (error) {
        return {error: error.message};
    }
}

export const balance = async ({account, agency}) => {
    try {
        const accountFound = await Account.findOne({agency, account});
        return {balance: accountFound.balance};
    } catch (error) {
        return {error: error.message};
    }
}