import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
    addExpense, startAddExpense , editExpense, startEditExpense, 
    removeExpense, startRemoveExpense, setExpenses, startSetExpenses
} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const uid = 'testuserid';
const defaultAuthState = { auth : { uid } };
const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
    const expenseData = {};
    expenses.forEach(({id, description, amount, note, createdAt}) => {
        expenseData[id] = {description, amount, note, createdAt};
    });
    database.ref(`users/${uid}/expenses`).set(expenseData).then(() => done());
})

test('should setup Remove Expense Action object', () => {
    const id = '1123234e';
    const action = removeExpense({ id })
    expect(action).toEqual({
        type : 'REMOVE_EXPENSE',
        id
    })
})

test('Should Remove Expense from firebase', (done) => {
    const store = createMockStore(defaultAuthState);
    const id = expenses[2].id;
    store.dispatch(startRemoveExpense({id})).then(()=>{
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type : 'REMOVE_EXPENSE',
            id
        });

        // This is not required but if you want to check if the data is removed or not
        return database.ref(`users/${uid}/expenses/${id}`).once('value');
    }).then(snapshot => {
        expect(snapshot.val()).toBeFalsy();
        done();
    })
})


test('Test Edit Expense Action',  ()=>{
    const res = editExpense('123qwe', {description : 'Gas Bill'});
    expect(res).toEqual({
        type : "EDIT_EXPENSE",
        id : '123qwe',
        updates : {
            description : 'Gas Bill'
        }
    })
})

test('Should Edit Expense from firebase', (done) => {
    const store = createMockStore(defaultAuthState);
    const id = expenses[1].id;
    const updates = {amount : 210}
    store.dispatch(startEditExpense(id, updates)).then(()=>{
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type : 'EDIT_EXPENSE',
            id, 
            updates
        });

        // This is not required but if you want to check if the data is removed or not
        return database.ref(`users/${uid}/expenses/${id}`).once('value');
    }).then(snapshot => {
        expect(snapshot.val().amount).toBe(updates.amount)
        done();
    })
})


test('Test Add Expense action with value provided', () => {
    const res = addExpense(expenses[2]);
    expect(res).toEqual({
        type : 'ADD_EXPENSE',
        expense : expenses[2]
    })
})

// we have to call "done" inorder for test case to complete execution
test('Should Add Expense to database and store', (done) => {
    const store = createMockStore(defaultAuthState);
    const expenseData = {
        description : 'Mouse',
        note : 'Bought mouse',
        amount : 300,
        createdAt : 10000
    };

    store.dispatch(startAddExpense(expenseData)).then(() => {
        const action = store.getActions();
        expect(action[0]).toEqual({
            type : "ADD_EXPENSE",
            expense : {
                id : expect.any(String),
                ...expenseData
            }
        })
        return database.ref(`users/${uid}/expenses/${action[0].expense.id}`).once('value')
    }).then(snapshot => {
        expect(snapshot.val()).toEqual(expenseData);
        done(); //Without this call, this test case will never complete execution
    })
})

test('Should Add Expense to database and store with Default value', () => {
    const store = createMockStore(defaultAuthState);
    const expenseData = {
        description : '',
        note : '',
        amount : 0,
        createdAt : 0
    };

    store.dispatch(startAddExpense({})).then(() => {
        const action = store.getActions();
        expect(action[0]).toEqual({
            type : "ADD_EXPENSE",
            expense : {
                id : expect.any(String),
                ...expenseData
            }
        })
        return database.ref(`users/${uid}/expenses/${action[0].expense.id}`).once('value')
    }).then(snapshot => {
        expect(snapshot.val()).toEqual(expenseData);
        done(); //Without this call, this test case will never complete execution
    }).catch(e => console.log('test'))
})

test('Should setup set Expense action object with data', () => {
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type : 'SET_EXPENSES',
        expenses
    })
})

test('Should fetch Expenses from firebase', () => {
    const store = createMockStore(defaultAuthState);
    store.dispatch(startSetExpenses())
         .then((done) => {
             const actions = store.getActions();
             expect(actions[0]).toEqual({
                 type : 'SET_EXPENSES',
                 expenses
             })
             done();
         })
})

// test('Should Add Expense action with Default value', () => {
//     const res = addExpense();
//     expect(res).toEqual({
//         type : 'ADD_EXPENSE',
//         expense : {
//             description : '',
//             note : '',
//             amount : 0,
//             createdAt : 0,
//             id : expect.any(String)
//         }
//     })
// })