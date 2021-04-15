import {createStore, combineReducers} from 'redux';
import {v4 as uuid} from 'uuid';

const demoState = {
    expenses: [{
      id: 'poijasdfhwer',
      description: 'January Rent',
      note: 'This was the final payment for that address',
      amount: 54500,
      createdAt: 0
    }],
    filters: {
      text: 'rent',
      sortBy: 'amount', // date or amount
      startDate: undefined,
      endDate: undefined
    }
};


// -- REDUCERS -- //

//Expenses Reducer
const expensesReducerDefaultState = [];
const expensesReducer = (state = expensesReducerDefaultState, action) => 
{
    switch(action.type)
    {
        case 'ADD_EXPENSE':
        {
            return [
                ...state,
                action.expense
            ]
        }
        case 'REMOVE_EXPENSE':
        {
            return state.filter(exp => exp.id != action.id);
        }
        case 'EDIT_EXPENSE':
        {
            return state.map(expense => {
                if(expense.id == action.id)
                {
                    return {
                        ...expense,
                        ...action.updates
                    }
                }
                else
                {
                    return expense;
                }
            })
        }
        default:
        {
            return state;
        }
    }
}

//Filter Reducer
const filterReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
}
const filterReducer = (state = filterReducerDefaultState, action) => {
    switch(action.type)
    {
        case 'SET_TEXT_FILTER':
        {
            return {
                ...state,
                text : action.text
            }
        }
        case 'SORT_BY_AMOUNT':
        {
            return {
                ...state,
                sortBy : 'amount'
            }
        } 
        case 'SORT_BY_DATE':
        {
            return {
                ...state,
                sortBy : 'date'
            }
        }
        case 'SET_START_DATE':
        {
            return {
                ...state,
                startDate : action.startDate
            }
        }
        case 'SET_END_DATE':
        {
            return {
                ...state,
                endDate : action.endDate
            }
        }
        default:
            return state;
    }
}

// -- ACTION GENERATORS -- //

//ADD_EXPENSE
const addExpense = ({ description = '', note = '', amount = 0, createdAt = 0} = {}) => ({
    type : 'ADD_EXPENSE',
    expense : {
        id : uuid(),
        description,
        note,
        amount,
        createdAt  
    }
})

//REMOVE_EXPENSE
const removeExpense = ({id} = {}) => ({
    type : 'REMOVE_EXPENSE',
    id
})

//EDIT_EXPENSE
const editExpense = ( id, updates = {} ) => ({
    type : 'EDIT_EXPENSE',
    id,
    updates
})

//SET_TEXT_FILTER
const setTextFilter = (text = '') => ({
    type : 'SET_TEXT_FILTER',
    text
})

//SORT_BY_AMOUNT
const sortByAmount = () => ({
    type : 'SORT_BY_AMOUNT'
})

//SORT_BY_DATE
const sortByDate = () => ({
    type : 'SORT_BY_DATE'
})

//SET_START_DATE
const setStartDate = (startDate = undefined) => ({
    type : 'SET_START_DATE',
    startDate
})

//SET_END_DATE
const setEndDate = (endDate = undefined) => ({
    type : 'SET_END_DATE',
    endDate
})

const store = createStore(
    combineReducers({
        expenses : expensesReducer,
        filters : filterReducer
    })
)
store.subscribe(() => {
    const state =  store.getState();
    //console.log(state);
    const visibleExpense = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpense);
})

const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => 
{
    return expenses.filter(expense => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
       
        return startDateMatch && endDateMatch && textMatch;
    }).sort((a,b) => {
        if(sortBy === 'date')
        {
            return a.createdAt < b.createdAt ? 1 : -1;
        }
        else if(sortBy === 'amount')
        {
            return a.amount < b.amount ? 1 : -1;
        }
    })
}


const expenseOne = store.dispatch(addExpense({description : 'Rent', amount : '1000', createdAt : -11000}))
const expenseTwo = store.dispatch(addExpense({description : 'Coffee', amount : '3000', createdAt : -1000}))

// store.dispatch(removeExpense({id : expenseOne.expense.id}));

// store.dispatch(editExpense(expenseTwo.expense.id, { amount : 4000 }));

// store.dispatch(setTextFilter('re'));

store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

// store.dispatch(setStartDate(-500))
// store.dispatch(setStartDate())
// store.dispatch(setEndDate(200))
// store.dispatch(setEndDate())

// const person = {
//     name : 'Jen',
//     age : 24
// }

// // since age is reused before spread operator, age will be 24 coming from person object
// // new age will be 35 as it will be overwritten by age : 35 below spread
// console.log({
//     age : 34,
//     ...person,
//     location : 'Jabalpur',
//     age : 35
// })