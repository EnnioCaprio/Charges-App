import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addictionalHours, modifiedHours, updatePayload, accumulateHours, updateAccumulatedHours, addOverwork, updateOverwork, updateMode } from '../../actions/actionReducer';

const ChargesMainSecond = ({ dayState, checkIfFreeDay, distributeHours, setDistributeHours, id, charges, saveData }) => {

    const [sendingIndex, setSendingIndex] = useState(undefined);

    const payloadState = useSelector(state => state.total);

    const totalHoursState = useSelector(state => state.totalHours);

    const hoursState = useSelector(state => state.hours);

    const overworkState = useSelector(state => state.overwork);

    const dispatch = useDispatch();

    useEffect(() => {
        updateOverworkState(sendingIndex);
    }, [overworkState]);

    useEffect(() => {
        const getContent = getCorrectPayload(id + 1);

        dispatch(updatePayload(id + 1, getContent));
    }, [hoursState]);

    const calculateHours = (cId, dId, day, hours) => {

        if (hours === '') {
            hours = '0';
        }

        let flagAdd = true;
        let flagAddModified = false;
        let regexLetters = /^[0-9]/;

        //Check if value is a number
        const checkLetters = regexLetters.test(hours);

        //Get specific code charges days
        let getContent = getCorrectPayload(cId);

        //Only check if that code charge has some days/hours added
        if (checkLetters) {
            if (getContent[0].days_keeper.length > 0) {
                //If the input has the same hours of the previously added day then block the action else just update it
                getContent[0].days_keeper.forEach(d => {
                    if (day == d.day && hours == d.hours) {
                        flagAdd = false;
                        flagAddModified = false;
                    } else if (day == d.day && hours != d.hours) {
                        flagAdd = false;
                        flagAddModified = true;
                    }
                });
            }

            const convertHours = parseInt(hours);

            //If input hours is higher than 0 and specific day wasn't added yet then add new day, hours and calculate total hours
            if (hours.length > 0 && flagAdd) {
                dispatch(addictionalHours(cId, day.toString(), convertHours));
                dispatch(updateMode('charge', true));
                calculateTotalHours(cId, convertHours);
            }

            //If input hours is higher than 0 and specified day was already added then just update its hours and update total hours 
            if (hours.length > 0 && flagAddModified) {
                let hoursDifference = 0;

                let structure = undefined;

                getContent[0].days_keeper.forEach(d => {
                    if (d.day == dId) {
                        hoursDifference = convertHours - parseInt(d.hours);
                        structure = d;
                    }
                });

                dispatch(modifiedHours(cId, structure, convertHours));
                dispatch(updateMode('charge', true));
                calculateTotalHours(cId, hoursDifference);
            }
        }
    }

    const calculateTotalHours = (id, hours) => {

        let pass = true;

        totalHoursState.filter(ths => {
            if (ths.id === id) {
                pass = false;
            }
        });

        if (pass) {
            dispatch(accumulateHours(id, hours));
        } else {
            dispatch(updateAccumulatedHours(id, hours));
        }

    }

    const addOverworkHours = (name, id, hours) => {

        let flag = true;

        let convertHours = hours;

        //OverworkState is an array of objects that collects every days/hours with an identifier (name of charge)
        //This loop is used to not create objects multiple times with the same day
        //If flag will be false then the object will only be updated
        if (overworkState.length > 0) {
            overworkState.forEach((oS) => {
                if (oS.charge === name && oS.id === id) {
                    flag = false;
                }
            })
        }

        if (convertHours === '' || convertHours === NaN) {
            convertHours = 0;
        }

        convertHours = parseInt(convertHours);

        if (flag) {
            dispatch(addOverwork(name, id, convertHours));
        } else {
            dispatch(updateOverwork(name, id, convertHours));
        }
        setSendingIndex(id);

    }

    const getCorrectPayload = (id) => {

        return hoursState.filter(hS => hS.id === id);

    }

    const updateOverworkState = (j) => {

        let flag = true;

        //DistributeHours is an array of objects where these objects have two properties, id and totalHours
        //It contains the totalHours for every column of the hours table
        //For example it collects all the hours under column day 1 for every charge
        if (distributeHours.length > 0) {
            distributeHours.forEach((dH) => {
                if (dH.id === j) {
                    flag = false;
                }
            })
        }

        let hours = 0;

        let i = j;

        //If the ids match and object with that specific index wasn't already created, the create it else just update total hours
        overworkState.forEach((oS) => {
            if (oS.id === i && flag) {
                hours += oS.hours
                setDistributeHours([
                    ...distributeHours,
                    {
                        id: i,
                        totalHours: hours
                    }
                ])

            }

            if (oS.id === i && flag === false) {
                console.log(hours, oS.hours);
                hours += oS.hours;
                setDistributeHours(
                    distributeHours.map(dH => dH.id === i ? { ...dH, totalHours: hours } : dH)
                )
            }
        })

    }

    const getChargeValues = (i1, i2, i3) => {
        if (typeof saveData !== 'undefined') {
            if (typeof saveData[i1] !== 'undefined') {
                if (saveData[i1].days_keeper[i2]?.day == (i3 + 1) && saveData[i1].days_keeper[i2].hours > 0) {
                    return saveData[i1].days_keeper[i2].hours;
                }
            }
        }
    }

    const disableBlock = (id, payloadState) => {

        let dBlock = false;

        if (payloadState.length > 0) {
            payloadState.map((s, i) => {
                if (s.id === id) {
                    dBlock = true
                }
            })
        } else {
            return "blocked";
        }

        if (dBlock) {
            return;
        } else {
            return "blocked"
        }

    }

    const blockTheRows = (payloadCode, index) => {
        return payloadCode?.id === index;
    }

    return (
        <Fragment>
            <div className="container-charge__second">
                <div className="container-charge__second__header">
                    <div className="container-charge__second__header__days">
                        {
                            [...Array(dayState?.periodLength)].map((d, i) => (
                                <div key={i + 1} className="container-charge__second__header__days__day">
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
                    <div className="container-charge__second__header__days__day__hours">
                        <p>Total hours</p>
                    </div>
                </div>
                <div className="container-charge__second__content">
                    <div className="container-charge__second__content__days">
                        {
                            charges?.map((c, index) => (
                                <div key={c.id_charge} className="container-charge__second__content__days__row">
                                    <div className={disableBlock((index + 1), payloadState)} tabIndex="-1"></div>
                                    {
                                        [...Array(dayState?.periodLength)].map((d, i) => (
                                            <div key={i + 1} className={checkIfFreeDay(i, "container-charge__second__content__days__row__day", dayState)}>
                                                {
                                                    dayState?.period > 15 ?
                                                        <div key={i + 1} onKeyDown={(e) => {
                                                            if (e.key === 'Tab' && ((i + 1) + 15) === parseInt(dayState?.period)) {
                                                                e.preventDefault();
                                                            } else if (e.key === 'Tab' || e.key === 'Enter') {
                                                                addOverworkHours(c.name_charge, ((i + 1) + 15), e.target.innerText);
                                                                return calculateHours((index + 1), ((i + 1) + 15), ((i + 1) + 15), e.target.innerText);
                                                            }
                                                        }} contentEditable={blockTheRows(payloadState[index], (index + 1))} suppressContentEditableWarning="true"
                                                            onKeyPress={(e) => {
                                                                if (e.target.innerText.length > 1) {
                                                                    e.preventDefault();
                                                                }
                                                            }}
                                                            data-testid={`charge-input-${index + 1}-${i + 1}`}
                                                        >{getChargeValues(index, i, i + 15)}</div>
                                                        :
                                                        <div key={i + 1} onKeyDown={(e) => {
                                                            if (e.key === 'Tab' && (i + 1) === parseInt(dayState?.period)) {
                                                                e.preventDefault();
                                                            } else if (e.key === 'Tab' || e.key === 'Enter') {
                                                                addOverworkHours(c.name_charge, i + 1, e.target.innerText);
                                                                return calculateHours((index + 1), (i + 1), (i + 1), e.target.innerText);
                                                            }
                                                        }} contentEditable={blockTheRows(payloadState[index], (index + 1))} suppressContentEditableWarning="true"
                                                            onKeyPress={(e) => {
                                                                if (e.target.innerText.length > 1) {
                                                                    e.preventDefault();
                                                                }
                                                            }}
                                                            data-testid={`charge-input-${index + 1}-${i + 1}`}
                                                        >{getChargeValues(index, i, i)}</div>
                                                }
                                            </div>
                                        ))
                                    }
                                </div>
                            ))
                        }
                    </div>
                    <div className="container-charge__second__content__result">
                        {
                            charges?.map((c, i) => (
                                <div key={c.id_charge} className="container-charge__second__content__result__single">
                                    {
                                        totalHoursState.map(ths => {
                                            if (ths.id === (i + 1)) {
                                                return ths.hours
                                            }
                                        })
                                    }
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export { ChargesMainSecond as default }