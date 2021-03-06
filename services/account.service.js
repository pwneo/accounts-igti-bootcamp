import {accountExists, db} from '../repositories/account.repository.js'

const Account = db.account;

export const create = async ({name, agency, account, value}) => {
    try{
        await accountExists({account});
        return await new Account({name, agency, account, balance: value}).save();
    } catch (error){
        throw new Error(error);
    }
}

export const listAll = async () => {
    return await Account.find();
}

export const findById = async ({id}) => {
    return Account.findOne({_id: id});
}

export const update = async ({id}, {name, agency, account}) => {
    await Account.findOneAndUpdate({_id: id}, {name, agency, account});
    return Account.findOne({agency, account});
}

export const deposit = async ({agency, account, value}) => {
    try {
        await accountExists(account);
        await Account.findOneAndUpdate({agency, account}, {$inc: {balance: value}});
        const accountResult = await Account.findOne({agency, account});
        return {balance: accountResult.balance};
    } catch (error) {
        throw new Error(error.message);
    }
}

export const draft = async ({agency, account, value}) => {
    try {
        await accountExists(account);
        const accountFound = Account.findOne({account, agency});
        if ((value + 1) > accountFound.balance || value <= 0) {
            throw new Error('Operation is invalid');
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
        throw new Error('Account not found');
    }
}

export const close = async ({account, agency}) => {
    try {
        await accountExists(account);
        await Account.findOneAndDelete({account, agency});
        const totalAccounts = await Account.find({agency});
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

        const accountOriginResult = await Account.findOne({account: accountOrigin.account, agency: accountOrigin.agency})
        const accountDestinationResult = await Account.findOne({account: accountDestination.account, agency: accountDestination.agency})

        return {
            balanceOrigin: accountOriginResult.balance,
            balanceDestination: accountDestinationResult.balance
        };

    } catch (error) {
        return {error: error.message};
    }
}

export const balanceAverage = async (agency) =>{
    const [{totalBalance}] = await Account.aggregate([
        {$match: {agency: agency}},
        {$group: { _id: null, totalBalance:{$sum: "$balance"} }}
    ]);

    const [{account}] = await Account.aggregate([
        {$match: {agency: agency}},
        {$count: 'account'}
    ]);
    const average = (totalBalance / account).toFixed(2);
   return {balanceAverage: average};
}

export const lowestBalance = async (quantity) => {
    return await Account.find().sort({balance: 1}).limit(quantity);

}

export const highestBalance = async (quantity) => {
    return await Account.find().sort({balance: -1}).limit(quantity);
}

export const agency99 = async () =>{
    const agencies = await Account.distinct("agency");
    for (const agency of agencies) {

        const [account] = await Account.find({agency}).sort({balance: -1}).limit(1);
        console.log(account);

        await Account.updateOne({account: account.account, agency}, {agency: 99});
    }
    return Account.find({agency:99});
}