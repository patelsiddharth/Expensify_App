import React from 'react';
import {shallow} from 'enzyme';
import {AddExpanse} from '../../components/AddExpanse';
import expenses from '../fixtures/expenses.js';

let addExpense, history, wrapper;

beforeEach(() => {
    addExpense = jest.fn();
    history = { push : jest.fn()};
    wrapper = shallow(<AddExpanse addExpense={addExpense} history={history} />);
})

test('Should render AddExpense Page Correctly', () => {
    expect(wrapper).toMatchSnapshot();
})

test('Should handle on Submit', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(addExpense).toHaveBeenLastCalledWith(expenses[1]);
})