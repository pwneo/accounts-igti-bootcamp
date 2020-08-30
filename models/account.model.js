export const accountModel = ({Schema, model}) => {
    const schema = Schema({
        agency: {
            type: Number,
            required: true
        },
        account: {
            type: Number,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        balance: {
            type: Number,
            required: true,
            min: 0
        }
    });

    const account = model('accounts', schema, 'accounts');
    return account;
}

