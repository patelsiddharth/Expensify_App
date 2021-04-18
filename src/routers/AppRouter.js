import React from 'react';
import Login from '../components/login';
import ExpenseDashboard from '../components/Dashboard';
import AddExpanse from '../components/AddExpanse';
import EditExpanse from '../components/EditExpanse';
import NotFound from '../components/NotFound';
import {Router,Route, Switch} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'

export const history = createHistory();

const AppRoutes = () => (
    <Router history={history}>
        <div>
            <Switch>
                <PublicRoute path="/" component={Login} exact={true} />
                <PrivateRoute path="/dashboard" component={ExpenseDashboard} />
                <PrivateRoute path="/create" component={AddExpanse} />
                <PrivateRoute path="/edit/:id" component={EditExpanse} />
                <Route component={NotFound}/>
            </Switch>
        </div>
    </Router>
);

export default AppRoutes;