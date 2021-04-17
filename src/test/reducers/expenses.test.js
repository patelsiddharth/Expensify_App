import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

test('Should set default state', () => {
    const state = expensesReducer(undefined, { type : '@@INIT'})
    expect(state).toEqual([]);
})

test('Should remove expense by id' , () => {
    const state = expensesReducer(expenses, {type : 'REMOVE_EXPENSE', id : expenses[1].id })
    expect(state).toEqual([ expenses[0], expenses[2] ])
})

test('Should not remove expense if id not found' , () => {
    const state = expensesReducer(expenses, {type : 'REMOVE_EXPENSE', id : '-1' })
    expect(state).toEqual([ expenses[0], expenses[1], expenses[2] ])
})


test('Should add an expense' , () => {
    const newExpense = {
        id : '4',
        description : 'Ice cream',
        note : '',
        amount : 45,
        createdAt : 0
    }
    const state = expensesReducer(expenses, {type : 'ADD_EXPENSE', expense : newExpense })
    expect(state).toEqual([ expenses[0], expenses[1], expenses[2], newExpense ])
})

test('Should Edit an expense' , () => {
    const updatedExpense = {
        description : 'Ice cream and chocolate',
        note : 'This is updated expense',
        amount : 250,
        createdAt : 1234
    }
    const id = '3';
    const state = expensesReducer(expenses, {type : 'EDIT_EXPENSE', id, updates : updatedExpense })
    expect(state).toEqual([ expenses[0], expenses[1], {...updatedExpense, id} ])
})

test('Should not Edit an expense if id not found' , () => {
    const updatedExpense = {
        description : 'Ice cream and chocolate',
        note : 'This is updated expense',
        amount : 250,
        createdAt : 1234
    }
    const id = '4';
    const state = expensesReducer(expenses, {type : 'EDIT_EXPENSE', id, updates : updatedExpense })
    expect(state).toEqual([ expenses[0], expenses[1], expenses[2]])
})

test('Should set expenses', ()=> {
    const action = {
        type : 'SET_EXPENSES',
        expenses : [expenses[2]]
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[2]]);
})