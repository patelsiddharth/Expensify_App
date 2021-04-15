import { setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate} from '../../actions/filters';
import moment from 'moment';

test('Test Start date action', () => {
    const action = setStartDate(moment(0));
    expect(action).toEqual({
        type : "SET_START_DATE",
        startDate : moment(0)
    })
})

test('Test End Date Action', () => {
    const action = setEndDate(moment(0));
    expect(action).toEqual({
        type : 'SET_END_DATE',
        endDate : moment(0)
    })
})

test('Test sort by date', ()=> {
    const action = sortByDate();
    expect(action).toEqual({
        type : "SORT_BY_DATE"
    })
})

test('Test sort by amount', ()=> {
    const action = sortByAmount();
    expect(action).toEqual({
        type : "SORT_BY_AMOUNT"
    })
})

test('Test sort by amount', ()=> {
    const action = setTextFilter('bill');
    expect(action).toEqual({
        type : "SET_TEXT_FILTER",
        text : 'bill'
    })
})

test('Test sort by amount', ()=> {
    const action = setTextFilter();
    expect(action).toEqual({
        type : "SET_TEXT_FILTER",
        text : ''
    })
})