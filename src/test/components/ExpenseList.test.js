import React from "react";
import {shallow} from 'enzyme';
import { ExpenseList } from '../../components/ExpenseList';
import expense from '../fixtures/expenses';

test('Should render ExpenseList with expenses', () => {
    const wrapper = shallow(<ExpenseList expenses={expense}/>);
    expect(wrapper).toMatchSnapshot();
})

test('Should render No Expense found meesage when expenses is empty', () => {
    const wrapper = shallow(<ExpenseList expenses={[]}/>);
    expect(wrapper).toMatchSnapshot();
})