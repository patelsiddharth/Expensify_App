import React from 'react'
import { shallow } from 'enzyme'
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

test('Should render ExpenseForm', () => {
    const wrapper = shallow(<ExpenseForm />)
    expect(wrapper).toMatchSnapshot();
})

test('Should render ExpenseForm with Expense data', () => {
    const wrapper = shallow(<ExpenseForm expense={expenses[0]}/>)
    expect(wrapper).toMatchSnapshot();
})

test('Should render error for invalid form submission', () => {
    const wrapper = shallow(<ExpenseForm />)
    wrapper.find('form').simulate('submit', {
        preventDefault : () => {}
    })
    expect(wrapper.state('error')).toBe(true)
    expect(wrapper).toMatchSnapshot();
})

test('Should set description on input change', () => {
    const value = 'New Description';
    const wrapper = shallow(<ExpenseForm />);
    // at define index. at(0) means takes 0th index element(first element)
    wrapper.find('input').at(0).simulate('change', {
        target : { value }
    })
    expect(wrapper.state('description')).toBe(value)
    // expect(wrapper).toMatchSnapshot();
})

test('Should set note on textarea change', () => {
    const value = 'New Note';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('textarea').simulate('change', {
        target : { value }
    })
    expect(wrapper.state('note')).toBe(value);
})

test('Should set amount if valid input', () => {
    const value = '23.50';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(1).simulate('change', {
        target : { value }
    })
    expect(wrapper.state('amount')).toBe(value);
})

test('Should not set amount if invalid input', () => {
    const value = '12.344';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(1).simulate('change', {
        target : { value }
    })
    expect(wrapper.state('amount')).toBe('');
})

test('Should call onSubmit prop for valid form submission', () => {
    const onSubmitSpy = jest.fn();
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy}/>)
    wrapper.find('form').at(0).simulate('submit', {
        preventDefault : () => {}
    })
    expect(wrapper.state('error')).toBeFalsy();
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        description : expenses[0].description,
        amount : expenses[0].amount,
        note : expenses[0].note,
        createdAt : expenses[0].createdAt
    });
})

test('Should set new date on DateChange', () => {
    const now = moment();
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find(SingleDatePicker).prop('onDateChange')(now)
    expect(wrapper.state('createdAt')).toEqual(now)
})

test('Should set calender focus on change', () => {
    const focused = true;
    const wrapper = shallow(<ExpenseForm />)
    wrapper.find(SingleDatePicker).prop('onFocusChange')({focused})
    expect(wrapper.state('calendarFocused')).toBe(focused)
})