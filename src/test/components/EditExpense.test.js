import React from 'react';
import {shallow} from 'enzyme';
import {EditExpanse} from '../../components/EditExpanse';
import expenses from '../fixtures/expenses';

let editExpense, removeExpense, history, wrapper;

beforeEach(() => {
    editExpense = jest.fn();
    removeExpense = jest.fn();
    history = { push : jest.fn() };
    wrapper = shallow(<EditExpanse 
        editExpense={editExpense} 
        removeExpense={removeExpense} 
        history={history}
        expense={expenses[2]}
    />);
})

test('Should render EditExpense Page Correctly', () => {
    expect(wrapper).toMatchSnapshot();
})

test('Should handle Edit Expense', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[2]);
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(editExpense).toHaveBeenLastCalledWith(expenses[2].id, expenses[2]);
})

test('Should handle Remove Expense', () => {
    wrapper.find('button').simulate('click');
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(removeExpense).toHaveBeenLastCalledWith({ id : expenses[2].id });
})