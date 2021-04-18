import React from 'react';
import {connect} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';
import Header from '../components/Header';

// component is renamed as custom react components cannot start with first small letter

export const PrivateRoute = ({
    isAuthenticated, 
    component : Component,
    ...rest
}) => (
    <Route {...rest} component={ (props) => (
        isAuthenticated ? (
            <div>
                <Header />
                <Component {...props}/>
            </div>
        ) : (
            <Redirect to="/" />
        )
    )}/>
)

const mapStateToProps = (state) => ({
    isAuthenticated : !!state.auth.uid
})

export default connect(mapStateToProps)(PrivateRoute)