import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../Loading/Loading';
import ChargesPage from '../Charges/ChargesPage';
import LocationsPage from '../Locations/LocationsPage';
import ErrorMessage from '../Error/ErrorMessage';
import { updateMode, addTemporaryLocations, createLocationCall, resetCharge, resetLocation, addConfirm, removeConfirm } from '../../actions/actionReducer';
import chargePageMethods from '../../componentFunctions/chargePage';
import requestsChargeOperation from '../../requestsCalls/chargesOperation';
import requestsConfirmedCharge from '../../requestsCalls/confirmedCharge';
import requestsLocationOperation from '../../requestsCalls/locationOperation';
import requestsCharges from '../../requestsCalls/charge';

const Homepage = () => {

    const [error, setError] = useState(undefined);

    const [listDays, setListDays] = useState(undefined);

    const [listLocations, setListLocations] = useState(undefined);

    const [saveData, setSaveData] = useState(undefined);

    const [loading, setLoading] = useState(false);

    const [submition, setSubmition] = useState(false);

    const [codes, setCodes] = useState(undefined);

    const [charges, setCharges] = useState(undefined);

    const totalState = useSelector(state => state.hours);

    const locationState = useSelector(state => state.location);

    const payloadLocation = useSelector(state => state.locationCharge);

    const payloadState = useSelector(state => state.total);

    const modeStatus = useSelector(state => state.mode);

    const dayState = useSelector(state => state.days);

    const periodState = useSelector(state => state.period);

    const employeeState = useSelector(state => state.employee);

    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(resetCharge());

        dispatch(resetLocation());

        setLoading(true);

        let array = [];

        if (periodState) {
            const getAllData = async () => {

                const confirm = await requestsConfirmedCharge.getConfirmedCharges(periodState);

                const charges = await requestsCharges.getCharges();

                const charge = await requestsChargeOperation.getTemporaryCharges(periodState);

                const location = await requestsLocationOperation.getTemporaryLocations(periodState);

                if (confirm.data.getConfirmedCharges.length > 0) {
                    dispatch(addConfirm(confirm.data.getConfirmedCharges[0].active_charge));
                } else {
                    dispatch(removeConfirm(false));
                }

                setCharges(charges.data.getCharges);

                let sortedCharge = [];

                if (charge) {
                    sortedCharge = charge.data.getTemporaryCharges.sort((a, b) => a.code_charge - b.code_charge);
                }

                if (sortedCharge.length > 0) {
                    //add missing days to days_keeper array, it helps during the rendering process in the ChargesMainSession component
                    chargePageMethods.convertArray(sortedCharge, 0, dayState?.period);
                }

                setSaveData(sortedCharge);

                //Retrive used code charges and then add them to an array, this array will be used for multiple checks
                sortedCharge.forEach((sC) => {
                    array.push(sC.code_charge);
                })

                setCodes(array);

                if (location) {

                    location.data.getTemporaryLocations.forEach((d, i) => {
                        dispatch(addTemporaryLocations(d.id_location, d.days_location));

                        dispatch(createLocationCall((i + 1), d.location_period, d.days_location, d.id_location, employeeState.id_employee))
                    })

                }

                setLoading(false);

            }

            getAllData();

        }

    }, [periodState, modeStatus.page]);

    useEffect(() => {
        createUsedDays(0, []);
    }, [totalState]);

    useEffect(() => {
        createUsedLocations(0, []);
    }, [locationState]);

    useEffect(() => {
        canISubmit();
    }, [listDays, listLocations]);

    useEffect(() => {

        if (modeStatus.page !== 'charge' && modeStatus.active) {
            requestsChargeOperation.createCharge(payloadState, 0);

            dispatch(updateMode('location', false));
        }

        if (modeStatus.page !== 'location' && modeStatus.active) {
            requestsLocationOperation.createLocations(payloadLocation, 0);

            dispatch(updateMode('charge', false));
        }

    }, [modeStatus.page])

    const canISubmit = () => {

        let bool = false;

        if (listDays?.length > 0 || listLocations?.length > 0) {

            const stringifiedDays = JSON.stringify(listDays);

            const stringifiedLocations = JSON.stringify(listLocations);

            if (stringifiedDays === stringifiedLocations) {
                bool = true;
            }

        }

        setSubmition(bool);

    }

    const createUsedDays = (i, array) => {

        if (typeof totalState[0] !== 'undefined') {
            totalState[i]?.days_keeper.forEach((tS, index) => {
                if (tS.hours !== 0 && tS.day != array[index]) {
                    array.push(parseInt(tS.day));
                }
            });

            setListDays(array);

            if (i === totalState.length - 1) {
                return;
            } else {
                createUsedDays((i + 1), array);
            }
        }

    }

    const createUsedLocations = (i, array) => {

        if (typeof locationState[0] !== 'undefined') {
            locationState[i]?.days.forEach(lS => {
                array.push(lS);
            });

            setListLocations(array);

            if (i === locationState.length - 1) {
                return;
            } else {
                createUsedLocations((i + 1), array);
            }
        }

    }

    const sendData = async () => {

        if (submition) {
            const data = await requestsConfirmedCharge.confirmedCharges(periodState);

            if (data.data.confirmCharges) {
                dispatch(addConfirm(true));
            }

            setError('calculating data');

        } else {

            setError('check charge/location hours');

        }

    }

    const deleteConfirm = async () => {

        const data = await requestsConfirmedCharge.deleteEmployeeCharge(periodState);

        if (data.data?.deleteEmployeeCharge) {
            dispatch(removeConfirm(false));
        }

    }

    const receiveErrorMessage = () => {

        setTimeout(() => {
            setError(undefined);
        }, 2500)

        return <ErrorMessage error={error} />

    }

    if (loading) {
        return (
            <Loading />
        )
    }

    return (
        <div className="container-homepage" data-testid="resolved">
            {
                error && receiveErrorMessage()
            }
            <div className="container-homepage__content">
                <div className="container-homepage__content__shell">
                    <div className="container-homepage__content__shell__table">
                        <div className="container-homepage__content__shell__table__mode">
                            <ul className="container-homepage__content__shell__table__mode__list">
                                <li>
                                    <button onClick={() => dispatch(updateMode('charge', modeStatus.active))}>
                                        Charges
                                    </button>
                                </li>
                                <li>
                                    <button onClick={() => dispatch(updateMode('location', modeStatus.active))}>
                                        Locations
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <div className="container-homepage__content__shell__table__time">
                            {
                                modeStatus.page === 'charge' ?
                                    <ChargesPage
                                        sendData={sendData}
                                        deleteConfirm={deleteConfirm}
                                        saveData={saveData}
                                        codes={codes}
                                        charges={charges}
                                    />
                                    :
                                    <LocationsPage
                                        sendData={sendData}
                                    />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { Homepage as default }
