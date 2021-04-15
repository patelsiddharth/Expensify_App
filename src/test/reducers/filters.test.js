import filterReducers from '../../reducers/filters';
import moment from 'moment';

test('Setup Default filter values', () => {
    const state = filterReducers(undefined, {type : '@@INIT'});
    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    })
})

test('Should set sort by to amount', () => {
    const state = filterReducers(undefined, {type : 'SORT_BY_AMOUNT'});
    expect(state).toEqual({
        text: '',
        sortBy: 'amount',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    })
})

test('Should set sort by to Date', () => {
    const currentState = {
        text: '',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined
    }
    const action = { type : 'SORT_BY_DATE' }
    
    const state = filterReducers(currentState, action);

    expect(state).toEqual({
        ...currentState,
        sortBy : 'date'
    })
    expect(state.sortBy).toBe('date')
})

test('Should set Text filter', () => {
    const action = { type : 'SET_TEXT_FILTER', text : 'Bill' }
    
    const state = filterReducers(undefined, action);
    expect(state.text).toBe('Bill')
})

test('Should set start Date Filter', () => {
    const action = { type : 'SET_START_DATE', startDate : 123 }
    
    const state = filterReducers(undefined, action);
    expect(state.startDate).toEqual(123)
})

test('Should set End Date Filter', () => {
    const action = { type : 'SET_END_DATE', endDate :123}
    
    const state = filterReducers(undefined, action);
    expect(state.endDate).toEqual(123)
})