import moment from 'moment';
import SelectExpenses from '../../selectors/expenses';
import expenses from '../fixtures/expenses';

test('Test Filter by Text', () => {
    const filters = {
        text : 'e',
        sortBy :'date',
        startDate : undefined,
        endDate : undefined
    }
    const action =  SelectExpenses(expenses, filters);
    expect(action).toEqual([expenses[2], expenses[1]])
})

test('Test Filter by Start Date', () => {
    const filters = {
        text : '',
        sortBy :'date',
        startDate : moment(0),
        endDate : undefined
    }
    const action =  SelectExpenses(expenses, filters);
    expect(action).toEqual([expenses[2], expenses[0]])
})

test('Test Filter by End Date', () => {
    const filters = {
        text : '',
        sortBy :'date',
        startDate : undefined,
        endDate : moment(0)
    }
    const action =  SelectExpenses(expenses, filters);
    expect(action).toEqual([expenses[0], expenses[1]])
})

test('Test Sort By Date', () => {
    const filters = {
        text : '',
        sortBy :'date',
        startDate : undefined,
        endDate :undefined
    }
    const action =  SelectExpenses(expenses, filters);
    expect(action).toEqual([expenses[2], expenses[0], expenses[1]])
})

test('Test Sort By Amount', () => {
    const filters = {
        text : '',
        sortBy :'amount',
        startDate : undefined,
        endDate :undefined
    }
    const action =  SelectExpenses(expenses, filters);
    expect(action).toEqual([expenses[2], expenses[1], expenses[0]])
})