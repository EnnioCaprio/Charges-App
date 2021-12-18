import React from 'react';

const ErrorMessage = ({error}) => {
    console.log(error);
    return(
        <div className="container-error">
            <div className="container-error__message">
                <h3>{error}</h3>
            </div>
        </div>
    )
}

export {ErrorMessage as default}