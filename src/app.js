import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRoutes, {history} from './routers/AppRouter';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import configureStore from './store/configureStore';
import {startSetExpenses} from './actions/expenses';
import {login, logout} from './actions/auth';
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
import {firebase} from './firebase/firebase';
import LoadingPage from './components/LoadingPage';

const store = configureStore();
const jsx = (
    <Provider store={store}>
        <AppRoutes />
    </Provider>
);

let hasRendered = false;
const RenderApp = () => {
    if(!hasRendered)
    {
        ReactDOM.render(jsx, document.getElementById('app'));
        hasRendered = true;
    }
    else
    {
        hasRendered = false;
    }
}

ReactDOM.render(<LoadingPage/>, document.getElementById('app'));

// This method is executed when user status moves from being unauthenticated to authenticated or from authenticated to unauthenticated
firebase.auth().onAuthStateChanged( user => {
    if(user)
    {
        store.dispatch(login(user.uid));
        store.dispatch(startSetExpenses()).then(()=>{
            console.log('logged In');
            RenderApp();
            if(history.location.pathname === '/')
            {
                history.push('/dashboard');
            }
        })
    }
    else
    {
        store.dispatch(logout());
        RenderApp();
        history.push('/');
        console.log('User logged Out');
    }
})