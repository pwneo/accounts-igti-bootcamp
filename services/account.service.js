import {db} from '../repositories/account.repository.js'

const Account = db.account;

export const create = async ({agencia, conta, nome, saldo}) => {
    const account = new Account({agencia, conta, nome, saldo});
    try {
        return await account.save();
    } catch (error) {
        return {error: error.message};
    }
}

export const listAll = async () =>{
    try {
        return await Account.find();
    } catch (error) {
        return {error: error.message};
    }
}