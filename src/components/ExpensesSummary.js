import React from 'react';
import {connect} from 'react-redux';
import numeral from 'numeral';
import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total';

export const ExpensesSummary = ({expenseCount, expenseTotal}) => {
    const isExpenseSingular = expenseCount === 1 ? 'expense' : 'expenses';
    const formattedTotal = numeral(expenseTotal).format('$0,0.00');
    return (
        <div>
            <h1>
                Viewing {expenseCount} {isExpenseSingular} totalling {formattedTotal}
            </h1>
        </div>
    )
}

const mapStateToProps = (state) => {
    const visibleExpenses = selectExpenses(state.expenses, state.filters);
    return {
        expenseCount : visibleExpenses.length,
        expenseTotal : selectExpensesTotal(visibleExpenses)
    }
}

export default connect(mapStateToProps)(ExpensesSummary);