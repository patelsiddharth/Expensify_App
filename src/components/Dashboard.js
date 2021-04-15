import React from 'react';
import ExpenseList from './ExpenseList';
import ExpenseListFilters from './ExpenseListFilters';

const ExpenseDashboard = ()=> (
    <div>
        This is Expensify App DashBoard Page
        <ExpenseListFilters />
        <ExpenseList />
    </div>
)

export default ExpenseDashboard;