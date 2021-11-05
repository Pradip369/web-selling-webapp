import React from 'react'
import { Redirect, Route } from 'react-router-dom'

export const SecureRoute = ({ component: Component, auth, path, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) => {
                if (!auth) {
                    return <Redirect to={`/login?${path}`} />
                } else {
                    return <Component {...rest} />;
                }
            }}
        />
    )
}

export const HomeRoute = ({ component: Component, auth, ...rest }) => {
    return (
        <Route
            {...rest}
            render={() => {
                if (auth) {
                    return <Redirect to="/" />
                } else {
                    return <Component {...rest} />;
                }
            }}
        />
    )
}