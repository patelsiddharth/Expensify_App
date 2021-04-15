import {addExpense, editExpense, removeExpense} from '../../actions/expenses';

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
    const expenseData = {description : 'Water bill', note : '', amount : 100, createdAt : 123};
    const res = addExpense(expenseData);
    expect(res).toEqual({
        type : 'ADD_EXPENSE',
        expense : {
           ...expenseData,
           id : expect.any(String)
        }
    })
})

test('Test Add Expense action with Default value', () => {
    const res = addExpense();
    expect(res).toEqual({
        type : 'ADD_EXPENSE',
        expense : {
            description : '',
            note : '',
            amount : 0,
            createdAt : 0,
            id : expect.any(String)
        }
    })
})