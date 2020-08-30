import {accountExists, db} from '../repositories/account.repository.js'

const Account = db.account;

export const deposit = async ({agency, account, value}) => {
    try {
        await accountExists(account);
        await Account.findOneAndUpdate({agency, account}, {$inc: {balance: value}});
        const accountResult = await Account.findOne({agency, account});
        return {balance: accountResult.balance};
    } catch (error) {
        return {error: error.message};
    }
}

export const draft = async ({agency, account, value}) => {
    try {
        await accountExists(account);
        const accountFound = Account.findOne({account, agency});
        if ((value + 1) > accountFound.balance || value <= 0) {
            throw new Error('Não possível realizar o saque');
        }

        await Account.findOneAndUpdate(
            {$and: [{agency, account}, {balance: {$gte: (value + 1)}}]},
            {$inc: {balance: -(value + 1)}}
        );

        const accountResult = await Account.findOne({agency, account});
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
        return {error: 'Account not found'};
    }
}

export const close = async ({account, agency}) => {
    try {
        await accountExists(account);
        await Account.findOneAndDelete({account, agency});
        const totalAccounts = await Account.find({agency});
        console.log(totalAccounts.length);
        return {message: `Total agency Accounts ${agency}: ${totalAccounts.length}`};
    } catch (error) {
        return {error: 'Account not found'};
    }
}

export const transfer = async ({accountTo, accountFrom, value}) => {
    try {
        await accountExists(accountTo);
        await accountExists(accountFrom);

        const accountOrigin = await Account.findOne({account: accountTo});
        const accountDestination = await Account.findOne({account: accountFrom});

        if (value > accountOrigin.balance || value <= 0) {
            throw new Error('Não possível realizar a transferência');
        }

        await Account.findOneAndUpdate(
            {account: accountDestination.account, agency: accountDestination.agency},
            {$inc: {balance: value}}
        );

        if (accountOrigin.agency !== accountDestination.agency) {
            value += 8;
        }

        await Account.findOneAndUpdate(
            {account: accountOrigin.account, agency: accountOrigin.agency},
            {$inc: {balance: -value}}
        );

        const accountResult = await Account.findOne({account: accountOrigin.account, agency: accountOrigin.agency})
        return {balance: accountResult.balance};
    } catch (error) {
        return {error: error.message};
    }
}