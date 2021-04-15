import SelectExpensesTotal from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses';

test('Should return 0 if no expenses present', () => {
    const res = SelectExpensesTotal([]);
    expect(res).toBe(0);
})

test('Should add up single expense', () => {
    const res = SelectExpensesTotal([expenses[0]]);
    expect(res).toBe(45);
})

test('Should add up multiple expense', () => {
    const res = SelectExpensesTotal(expenses);
    expect(res).toBe(3418);
})