import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Redirect } from 'react-router';
import Dashboard from './home/dashboard';
import Employee from './employee/index';
import Souvenir from './souvenir/index';
import EditEmployee from './employee/edit';
// import EditSouvenir from './souvenir/edit';
import appconfig from '../config/app.config.json';
import tokenExpired from '../common/checkTokenExpired';

const Switcher = () => {
    return (
        <Switch>
            <PrivateRoute path = "/dashboard" component = { Dashboard } />
            <PrivateRoute path = "/employee/list" component = { Employee } />
            <PrivateRoute path = "/employee/edit" component = { EditEmployee } />
            <PrivateRoute path = "/souvenir/list" component = { Souvenir } />
            {/* <PrivateRoute path = "/souvenir/edit" component = { EditSouvenir } /> */}
        
        </Switch>
    )
}
const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render = { props =>
            tokenExpired.isTokenExpired(localStorage.getItem(appconfig.secure_key.token)) === false ||
            localStorage.getItem(appconfig.secure_key.token) != null ?
            (
                console.log(tokenExpired.isTokenExpired(localStorage.getItem(appconfig.secure_key.token))),
                console.log("Lagi di sini"),
                <Component {...props} />
            ) :
            (
                <Redirect to = {{
                        pathname: "/",
                        state: { from: props.location }
                    }}
                />
            )
        }
    />
);

export default Switcher
