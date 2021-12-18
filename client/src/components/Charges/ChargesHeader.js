import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addDaysInfo, resetCharge, insertPeriod, resetLocation } from '../../actions/actionReducer';
import { getDateResult } from '../../custom/date';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faUser } from '@fortawesome/free-solid-svg-icons';

const ChargesHeader = ({ sendData, deleteConfirm, saveData }) => {

    const periodState = useSelector(state => state.period);

    const employeeState = useSelector(state => state.employee);

    const modeStatus = useSelector(state => state.mode);

    const confirmState = useSelector(state => state.confirm);

    const dispatch = useDispatch();

    useEffect(() => {
        if (!periodState) {
            getCurrentDate(null, true, undefined);
        }
    }, [])

    const getCurrentDate = (value, check, mode) => {

        const { fullDate, period, weekDaysNames } = getDateResult(value, check, periodState, mode);

        dispatch(insertPeriod(fullDate));

        let periodLength = period;

        if (period > 15) {
            periodLength = period - 15;
        }

        dispatch(addDaysInfo(periodLength, period, weekDaysNames));

        if (check === false) {
            dispatch(resetCharge());

            dispatch(resetLocation());
        }

    }

    return (
        <Fragment>
            <div className="container-charge__sub">
                <div className="container-charge__sub__first">
                    <div className="container-charge__sub__first__user">
                        <i><FontAwesomeIcon icon={faUser} /></i>
                        <p>{employeeState.name} {employeeState.surname}</p>
                    </div>
                    <div className="container-charge__sub__first__date">
                        <div>
                            <i><FontAwesomeIcon icon={faArrowLeft} onClick={() => getCurrentDate(-1, false, 'back')} data-testid="back-arrow" /></i>
                            <p data-testid="period">{periodState}</p>
                            <i><FontAwesomeIcon icon={faArrowRight} onClick={() => getCurrentDate(1, false, 'next')} data-testid="next-arrow" /></i>
                        </div>
                    </div>
                </div>
                <div className="container-charge__sub__second">
                    <div>
                        <p>Status: {confirmState ? 'Confirmed' : 'Not Confirmed'}</p>
                    </div>
                    {
                        modeStatus?.page === 'charge' &&
                        <div>
                            {
                                confirmState ?
                                    <button onClick={() => deleteConfirm()}>Delete hours</button>
                                    :
                                    <button onClick={() => sendData()} disabled={saveData?.length === 0} data-testid="calculateH">Calculate hours</button>
                            }
                        </div>
                    }
                </div>
            </div>
        </Fragment>
    )

}

export { ChargesHeader as default }