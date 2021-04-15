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
const jsx = (
    <Provider store={store}>
        <AppRoutes />
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));