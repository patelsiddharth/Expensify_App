import React from 'react';
import Header from '../components/Header';
import ExpenseDashboard from '../components/Dashboard';
import AddExpanse from '../components/AddExpanse';
import EditExpanse from '../components/EditExpanse';
import Help from '../components/Help';
import NotFound from '../components/NotFound';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

const AppRoutes = () => (
    <BrowserRouter>
        <div>
            <Header />
            <Switch>
                <Route path='/' component={ExpenseDashboard} exact={true} />
                <Route path='/create' component={AddExpanse} />
                <Route path="/edit/:id" component={EditExpanse} />
                <Route path='/help' component={Help} />
                <Route component={NotFound}/>
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRoutes;