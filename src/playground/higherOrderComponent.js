import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>NOTE : {props.info}</p>
    </div>
)

const warningAdmin = (WrappedComponent) => {
    return (props) => (
        <div>
            { props.isAdmin && <p><b>This is confidential information. Please do not share</b></p>}
            <WrappedComponent {...props}/>
        </div>
    )
}

const requireAuthentication = (WrappedComponent) => {
    return (props) => (
        <div>
            { props.isAuthenticated ?  <WrappedComponent {...props}/> : <p>User is not authenticated. Please login</p>}
        </div>
    )
}

const AdminInfo = warningAdmin(Info);

const AuthInfo = requireAuthentication(Info)


// ReactDOM.render(<AdminInfo isAdmin={true} info='This is info page'/>, document.getElementById('app'));
ReactDOM.render(<AuthInfo isAuthenticated={false} info='This is info page'/>, document.getElementById('app'));