import React from 'react';

const MobilePage = () => {

    return(
        <div className="container-mobile">
            <div className="container-mobile__warning">
                <div className="container-mobile__warning__title">
                    <p>Message</p>
                </div>
                <div className="container-mobile__warning__informations">
                    <p>This app can't be used on mobile</p>
                </div>
            </div>
        </div>
    )

}

export {MobilePage as default}