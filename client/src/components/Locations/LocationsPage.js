import React, { useEffect, useState, useRef } from 'react';
import ChargesHeader from '../Charges/ChargesHeader';
import Loading from '../Loading/Loading';
import LocationSave from './LocationSave';
import locationPageMethods from '../../componentFunctions/locationPage';
import { useDispatch, useSelector } from 'react-redux';
import { createLocationPayload, addLocationDay, removeLocationDay, updateLocationPayload, updateMode } from '../../actions/actionReducer';
import requestsLocation from '../../requestsCalls/locations';

const LocationsPage = ({ sendData }) => {

    const payloadLocation = useSelector(state => state.locationCharge);

    const daysLocation = useSelector(state => state.location);

    const dayState = useSelector(state => state.days);

    const periodState = useSelector(state => state.period);

    const confirmState = useSelector(state => state.confirm);

    const employeeState = useSelector(state => state.employee);

    const [waitAddLocation, setWaitAddLocation] = useState(true);

    const [updateLocationInfo, setUpdateLocationInfo] = useState(undefined);

    const [error, setError] = useState(false);

    const [city, setCity] = useState(undefined);

    const [loading, setLoading] = useState(true);

    const [locations, setLocations] = useState(undefined);

    const dispatch = useDispatch();

    const isMounted = useRef(true);

    useEffect(() => {
        return () => {
            isMounted.current = false;
        }
    }, [])

    useEffect(() => {

        const getDataLocations = async () => {
            const data = await requestsLocation.getLocations();

            if (isMounted.current) {
                setLocations(data.data.getLocations);

                setLoading(false);
            }
        }

        getDataLocations();

        getLocation();

    }, [])

    useEffect(() => {

        if (daysLocation) {
            const bool = locationPageMethods.checkError(0, false, daysLocation);

            setError(bool);
        }

        if (waitAddLocation === false) {
            dispatch(updateLocationPayload(updateLocationInfo, daysLocation[updateLocationInfo - 1].days));
        }

    }, [daysLocation]);

    const getLocation = () => {

        //Get your current location
        /*if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;

                const details = await locationPageMethods.getLocationData(latitude, longitude);

                const { country, county } = details.results[0].components;

                if (isMounted.current) {
                    setCity({ country, county });
                    setLoading(false);
                }
            });
        }*/

    }

    const addLocationDays = (id, lId) => {

        let id_location = locations[id - 1].id_location;

        let blockAdd = false;

        //DaysLocation is a static array with two objects (office and work from home)
        const daysList = daysLocation[id - 1].days;

        //If a day was already filled then it will not be possible to add another time the same day
        if (daysList.length > 0) {
            daysList.forEach(day => {
                if (day === lId) {
                    blockAdd = true;
                }
            })
        }

        if (typeof payloadLocation[id - 1] === 'undefined') {
            dispatch(createLocationPayload(id, periodState, id_location, employeeState.id_employee));
        }

        if (blockAdd === false) {
            dispatch(addLocationDay(id, lId));
        } else {
            dispatch(removeLocationDay(id, lId));
        }

        dispatch(updateMode('location', true));

        setUpdateLocationInfo(id);

        setWaitAddLocation(false);

    }

    if (loading) {
        return (
            <Loading />
        )
    }

    return (
        <div className="container-location" data-testid="resolved">
            <ChargesHeader sendData={sendData} />
            <div className="container-location__wrap">
                {
                    confirmState && <div className="container-location__confirm"></div>
                }
                <div className="container-location__wrap__first">
                    <div className="container-location__wrap__first__header">
                        <h4>Locations</h4>
                    </div>
                    <div className="container-location__wrap__first__content">
                        <div>
                            <p data-testid="office">Work from {locations[0]?.location_name} - {city?.county} - {city?.country}</p>
                        </div>
                        <div>
                            <p data-testid="home">Work from {locations[1]?.location_name} - {city?.county} - {city?.country}</p>
                        </div>
                    </div>
                </div>
                <div className="container-location__wrap__second">
                    <div className="container-location__wrap__second__header">
                        <div className="container-location__wrap__second__header__days">
                            {
                                [...Array(dayState?.periodLength)].map((d, i) => (
                                    <div key={i + 1} className="container-location__wrap__second__header__days__day">
                                        {
                                            dayState?.period > 15 ?
                                                <div>
                                                    <p>{(i + 1) + 15}</p>
                                                    <p>{dayState?.weekDaysNames[i]?.dayName}</p>
                                                </div>
                                                :
                                                <div>
                                                    <p>{i + 1}</p>
                                                    <p>{dayState?.weekDaysNames[i]?.dayName}</p>
                                                </div>
                                        }
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="container-location__wrap__second__content">
                        <div className="container-location__wrap__second__content__row">
                            {
                                [...Array(dayState?.periodLength)].map((d, i) => (
                                    <div key={i + 1}>
                                        {
                                            dayState?.period > 15 ?
                                                <div onClick={() => {
                                                    addLocationDays(1, (i + 16));
                                                }} className={locationPageMethods.modifyColor(1, (i + 16), daysLocation)} data-testid={`location-input-${1}-${i + 1}`}>
                                                </div>
                                                :
                                                <div onClick={() => {
                                                    addLocationDays(1, (i + 1));
                                                }} className={locationPageMethods.modifyColor(1, (i + 1), daysLocation)} data-testid={`location-input-${1}-${i + 1}`}>
                                                </div>
                                        }
                                    </div>
                                ))
                            }
                        </div>
                        <div className="container-location__wrap__second__content__row">
                            {
                                [...Array(dayState?.periodLength)].map((d, i) => (
                                    <div key={i + 1}>
                                        {
                                            dayState?.period > 15 ?
                                                <div onClick={() => {
                                                    addLocationDays(2, (i + 16));
                                                }} className={locationPageMethods.modifyColor(2, (i + 16), daysLocation)} data-testid={`location-input-${2}-${i + 1}`}>
                                                </div>
                                                :
                                                <div onClick={() => {
                                                    addLocationDays(2, (i + 1));
                                                }} className={locationPageMethods.modifyColor(2, (i + 1), daysLocation)} data-testid={`location-input-${2}-${i + 1}`}>
                                                </div>
                                        }
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
            <LocationSave
                error={error}
                payloadLocation={payloadLocation}
            />
        </div>
    )

}

export { LocationsPage as default }