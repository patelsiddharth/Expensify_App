import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRoutes from './routers/AppRouter';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import configureStore from './store/configureStore';
import {addExpense, removeExpense, editExpense} from './actions/expenses';
import {setTextFilter} from './actions/filters';
import filterReducer from './reducers/filters';
import visibleExpense from './selectors/expenses';
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';

const store = configureStore();

store.dispatch(addExpense({description : 'Gas', amount : 2000, createdAt : 123000}))
store.dispatch(addExpense({description : 'Water Bill', amount : 4500, createdAt : -100}))
store.dispatch(addExpense({description : 'Electricity Bill', amount : 2300, createdAt : 1223}))

const storeExpense = store.getState();
console.log(storeExpense);
const expense = visibleExpense(storeExpense.expenses,{text : 'bill'});
console.log(expense);

const jsx = (
    <Provider store={store}>
        <AppRoutes />
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));