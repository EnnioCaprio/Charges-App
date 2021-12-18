import React from 'react';
import { useSelector } from 'react-redux';
import requestsLocationOperation from '../../requestsCalls/locationOperation';

const LocationSave = ({ error, payloadLocation }) => {

    const confirmState = useSelector(state => state.confirm);

    const saveLocations = async () => {

        let message = '';

        if (error) {
            message = 'cannot save locations';
        } else {
            await requestsLocationOperation.createLocations(payloadLocation, 0);
            message = 'saving....';
        }

        return message;

    }

    return (
        <div className="container-location__save">
            {
                confirmState && <div className="container-location__confirm"></div>
            }
            <div className="container-location__save__error">
                {
                    error ?
                        <p data-testid="error-message">You have selected multiple locations for one or more days. Remove it or them for saving location</p>
                        :
                        ''
                }
            </div>
            <div className="container-location__save__button">
                <div>
                    <button onClick={() => saveLocations()} disabled={payloadLocation.length === 0 || error}>
                        Save Locations
                    </button>
                </div>
            </div>
        </div>
    )

}

export { LocationSave as default }