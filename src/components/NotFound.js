import React from 'react';
import {Link} from 'react-router-dom';

const NotFound = ()=> (
    <div>
        <p>404 !!! Page Not Found.</p>
        <Link to='/'>Go to Home Page</Link>
    </div>
)

export default NotFound;