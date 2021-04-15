import React from 'react';
import {NavLink} from 'react-router-dom';

const Header = () => (
    <header>
        <h1>Expensify App</h1>
        <NavLink to='/' activeClassName='is-active' exact>DashBoard</NavLink>
        <NavLink to='/create' activeClassName='is-active'>Add Expanse</NavLink>
    </header>
)

export default Header;