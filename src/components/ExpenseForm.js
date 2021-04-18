import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

export default class ExpenseForm extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            description : props.expense ? props.expense.description : '',
            note : props.expense ? props.expense.note :'',
            amount : props.expense ? props.expense.amount.toString() : '',
            createdAt : props.expense ? moment(props.expense.createdAt) : moment(),
            calendarFocused : false,
            error : false
        }
    }

    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(() => ({ description }))
    };

    onNoteChange = (e) => {
        const note = e.target.value;
        this.setState( () => ({ note }));
    };

    onAmountChange = (e) => {
        const amount = e.target.value;
        if(amount.match(/^\d*(\.\d{0,2})?$/))
        {
            this.setState( () => ({amount}))
        }
    };

    onDateChange = (createdAt) => {
        if(createdAt)
        {
            this.setState( () => ({createdAt}))
        }
    }

    onFocusChange = ({ focused }) => {
        this.setState( () => ({ calendarFocused : focused }))
    }
    onFormSubmit = (e) => {
        e.preventDefault();
        if(!this.state.description || !this.state.amount)
        {
            this.setState( () => ({error : true}))
        }
        else
        {
            this.setState( () => ({error : false}))
            this.props.onSubmit({
                description : this.state.description,
                amount : parseFloat(this.state.amount),
                createdAt : this.state.createdAt.valueOf(),
                note : this.state.note
            })
        }
    }

    render()
    {
        return (
            <form className="form" onSubmit={this.onFormSubmit}>
                {this.state.error && <p className="form__error">Please provide description and amount</p>}
                <input className="text-input"
                        type='text' placeholder='Description' autoFocus 
                        value={this.state.description}
                        onChange={this.onDescriptionChange}
                />
                <input className="text-input" 
                        type='number' placeholder='Amount'
                        value={this.state.amount}
                        onChange={this.onAmountChange}
                />
                <SingleDatePicker 
                    className="date-time"
                    date={this.state.createdAt}
                    onDateChange = {this.onDateChange}
                    focused = {this.state.calendarFocused}
                    onFocusChange = {this.onFocusChange}
                    numberOfMonths={1}
                    isOutsideRange={() => false}
                />
                <textarea className="textarea"
                            placeholder='Add a note for your expense'
                            value={this.state.note}
                            onChange={this.onNoteChange}>
                </textarea>
                <button className="button">Add Expense</button>
            </form>
        )
    }
}