import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startEditExpense, startRemoveExpense } from '../actions/expenses';
import { Link } from 'react-router-dom';

export class EditExpanse extends React.Component
{
    onSubmit = (expense) => {
        this.props.startEditExpense(this.props.expense.id, expense);
        this.props.history.push('/dashboard');
    }

    onRemove = (e) => {
        this.props.startRemoveExpense({id : this.props.expense.id});
        this.props.history.push('/dashboard');
    }

    render()
    {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Edit Expense</h1>
                        <Link to='/dashboard'>Back to Dashboard</Link>
                    </div>
                </div>
                <div className="content-container">
                    <ExpenseForm 
                        expense={this.props.expense}
                        onSubmit = {this.onSubmit}
                    />
                    <button className="button button--secondary" onClick={this.onRemove}>Remove Expense</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => ({
    expense : state.expenses.find(expense => expense.id === props.match.params.id)
})

const mapDispatchToProps = (dispatch, props) => ({
    startEditExpense : (id, expense) => dispatch(startEditExpense(id, expense)),
    startRemoveExpense : (data) => dispatch(startRemoveExpense(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditExpanse);

// const EditExpanse = (props) => {
//     return (
//         <div>
//             <Link to='/'>Back to Dashboard</Link>
//             <ExpenseForm 
//                 expense={props.expense}
//                 onSubmit = { expense => {
//                     props.dispatch(editExpense(props.expense.id, expense));
//                     props.history.push('/');
//                 }}
//             />
//             <button onClick={ e => {
//                 props.dispatch(removeExpense({id : props.expense.id}))
//                 props.history.push('/');
//             }}>Remove Item</button>
//         </div>
//     );
// };