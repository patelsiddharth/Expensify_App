import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {startAddExpense ,addExpense, editExpense, removeExpense, setExpenses, startSetExpenses} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
    const expenseData = {};
    expenses.forEach(({id, description, amount, note, createdAt}) => {
        expenseData[id] = {description, amount, note, createdAt};
    });
    database.ref('expenses').set(expenseData).then(() => done());
})

test('Test Remove Expense Action', () => {
    const action = removeExpense({ id : '1123234e'})
    expect(action).toEqual({
        type : 'REMOVE_EXPENSE',
        id : '1123234e'
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

test('Test Add Expense action with value provided', () => {
    const res = addExpense(expenses[2]);
    expect(res).toEqual({
        type : 'ADD_EXPENSE',
        expense : expenses[2]
    })
})

// we have to call "done" inorder for test case to complete execution
test('Should Add Expense to database and store', (done) => {
    const store = createMockStore({});
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
        return database.ref(`expenses/${action[0].expense.id}`).once('value')
    }).then(snapshot => {
        expect(snapshot.val()).toEqual(expenseData);
        done(); //Without this call, this test case will never complete execution
    })
})

test('Should Add Expense to database and store with Default value', () => {
    const store = createMockStore({});
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
        return database.ref(`expenses/${action[0].expense.id}`).once('value')
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
    const store = createMockStore({});
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