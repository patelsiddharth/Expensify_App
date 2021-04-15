import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { editExpense, removeExpense } from '../actions/expenses';
import { Link } from 'react-router-dom';

export class EditExpanse extends React.Component
{
    onSubmit = (expense) => {
        this.props.editExpense(this.props.expense.id, expense);
        this.props.history.push('/');
    }

    onRemove = (e) => {
        this.props.removeExpense({id : this.props.expense.id});
        this.props.history.push('/');
    }

    render()
    {
        return (
            <div>
                <Link to='/'>Back to Dashboard</Link>
                <ExpenseForm 
                    expense={this.props.expense}
                    onSubmit = {this.onSubmit}
                />
                <button onClick={this.onRemove}>Remove Item</button>
            </div>
        );
    }
}

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

const mapStateToProps = (state, props) => ({
    expense : state.expenses.find(expense => expense.id === props.match.params.id)
})

const mapDispatchToProps = (dispatch, props) => ({
    editExpense : (id, expense) => dispatch(editExpense(id, expense)),
    removeExpense : (data) => dispatch(removeExpense(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditExpanse);