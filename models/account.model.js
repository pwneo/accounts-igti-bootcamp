export const accountModel = ({Schema, model}) => {
    const schema = Schema({
        agencia: {
            type: Number,
            required: true
        },
        conta: {
            type: Number,
            required: true
        },
        nome: {
            type: String,
            required: true
        },
        saldo: {
            type: Number,
            required: true,
            min: 0
        }
    });

    const account = model('accounts', schema, 'accounts');
    return account;
}

