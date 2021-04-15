import React from 'react';
import {shallow} from 'enzyme';
import {ExpensesSummary} from '../../components/ExpensesSummary';

test('Should correctly render Expenses Summary with 1 expense', () => {
    const wrapper = shallow(<ExpensesSummary expenseCount={1} expenseTotal={120}/>);
    expect(wrapper).toMatchSnapshot();
})

test('Should correctly render Expenses Summary with multiple expenses', () => {
    const wrapper = shallow(<ExpensesSummary expenseCount={10} expenseTotal={1200}/>);
    expect(wrapper).toMatchSnapshot();
})