import React from 'react';
import {shallow} from 'enzyme';
import {AddExpanse} from '../../components/AddExpanse';
import expenses from '../fixtures/expenses.js';

let startAddExpense, history, wrapper;

beforeEach(() => {
    startAddExpense = jest.fn();
    history = { push : jest.fn()};
    wrapper = shallow(<AddExpanse startAddExpense={startAddExpense} history={history} />);
})

test('Should render startAddExpense Page Correctly', () => {
    expect(wrapper).toMatchSnapshot();
})

test('Should handle on Submit', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(startAddExpense).toHaveBeenLastCalledWith(expenses[1]);
})