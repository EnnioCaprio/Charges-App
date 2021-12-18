import React from 'react';

const Loading = () => {

    return (
        <div className="container-loading" data-testid="loading">
            <div className="container-loading__center">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    )

}

export { Loading as default }