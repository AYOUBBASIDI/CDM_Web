const {enableAccount} = require('../controllers/Client/userController');
const Account = require('../models/accountModel.js');

describe('enableAccount', () => {
    let req;
    let res;

    beforeEach(() => {
        req = {
            params: {
                identifiant: '123456789'
            }
        };
        res = {
            status: jest.fn(() => res),
            json: jest.fn(() => res)
        };
        Account.updateOne = jest.fn(() => Promise.resolve());
    });

    test('should return a 200 response and a message on successful account enabling', async () => {
        await enableAccount(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Account enabled successfully.' });
        expect(Account.updateOne).toHaveBeenCalledWith({ identifiant: '123456789' }, { $set: { status: 'active' } });
    });

    test('should return a 500 response and an error message on error', async () => {
        const error = new Error('Error enabling account');
        Account.updateOne.mockImplementation(() => Promise.reject(error));
        await enableAccount(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Error enabling account' });
    });
});
