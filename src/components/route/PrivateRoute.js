import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from "../../context/authentication/authContext";

export const PrivateRoute = ({ component: Component, ...props }) => {

    const { loading, authenticated, userAuthenticated } = useContext(AuthContext)

    useEffect(() => {
        userAuthenticated()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Route {...props} render={props => !authenticated && !loading ? (
            <Redirect to="/" />
        ) : (
            <Component {...props} />
        )} />
    )
}