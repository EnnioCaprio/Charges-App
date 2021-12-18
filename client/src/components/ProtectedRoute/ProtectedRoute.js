import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ component: Component, ...rest }) => {

    const loginState = useSelector(state => state.login);

    return(
        <Route
            {...rest}
            render={props => {
                if(loginState){
                    return <Component {...props} />
                }else{
                    return (
                        <Redirect
                            to={{
                                pathname: '/',
                                state: {
                                    from: props.location
                                }
                            }}
                        />
                    )
                }
            }}
        />
    )

}

export {ProtectedRoute as default}