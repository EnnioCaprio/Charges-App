import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';

const NotFound = () => {
    return(
        <div className="container-notfound">
            <div className="container-notfound__center">
                <div className="container-notfound__center__information">
                    <p>Not found</p>
                    <p>404</p>
                    <Link to="/">
                        <FontAwesomeIcon icon={faLongArrowAltLeft} size="4x" style={{ color: '#000000', textAlign: 'center' }} />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export { NotFound as default }