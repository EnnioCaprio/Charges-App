import React, { Fragment, useState } from 'react';
import Model from '../Model/Model';
import ErrorMessage from '../Error/ErrorMessage';
import { useDispatch, useSelector } from 'react-redux';
import { activeWindow, addCharges, updateCharge, createAnotherArray, createPayload, updatePayloadCode } from '../../actions/actionReducer';

const ChargeMainFirst = ({ chargesNodes, id, mode, charges }) => {

    const periodState = useSelector(state => state.period);

    const employeeState = useSelector(state => state.employee);

    const [error, setError] = useState(undefined);

    const dispatch = useDispatch();

    //It manages the charges name (Home, Office, Holidays, ...)
    const manageCharges = (id, name, code) => {
        let response = undefined;

        let stopAddCharge = false;

        let changeCharge = false;

        //Check inside chargesNodes if a specific charge was already used or not and also manage the replacement of a charge itself
        chargesNodes.map(cn => {
            if (cn.fullname === name) {
                stopAddCharge = true;
                response = "Code already used";
            }

            if (cn.id === id && cn.fullname !== name) {
                changeCharge = true;
            }
        })

        //If specific code charge wasn't used then create it and add days/hours to it
        //If specific code charge exists than just updates its values
        //If you try to use a code charge already used anywhere else it will return error
        if (stopAddCharge === false && changeCharge === false) {
            dispatch(addCharges(id, name));

            dispatch(createAnotherArray(id));

            dispatch(createPayload(id, code, periodState, employeeState.id_employee));
        } else if (stopAddCharge === false && changeCharge) {
            dispatch(updateCharge(id, name));

            dispatch(updatePayloadCode(id, code));
        } else {
            setError(response);
        }
    }

    const receiveErrorMessage = () => {

        setTimeout(() => {
            setError(undefined);
        }, 2500)

        return <ErrorMessage error={error} />

    }

    return (
        <Fragment>
            {
                error && receiveErrorMessage()
            }
            <div className="container-charge__first">
                <div className="container-charge__first__header">

                </div>
                <div className="container-charge__first__assignments">
                    {
                        charges?.map((c, i) => (
                            <div key={i} className="container-charge__first__assignments__charges">
                                <div className="container-charge__first__assignments__charges__model">
                                    {
                                        id === i && mode &&
                                        <Model
                                            id={i}
                                            open={mode}
                                            manageCharges={manageCharges}
                                            charges={charges}
                                        />
                                    }
                                </div>
                                <div className="container-charge__first__assignments__charges__charge" data-testid={`charge-item`}>
                                    <div className="container-charge__first__assigments__charges__charge__code">
                                        {
                                            chargesNodes.map(cn => {
                                                if (cn.id === (i + 1)) {
                                                    return <p key={cn.id}>{cn.fullname}</p>
                                                }
                                            })
                                        }
                                    </div>
                                    <div className="container-charge__first__assigments__charges__charge__insert">
                                        <button key={i} data-testid={`charge-${i + 1}`} onClick={() => dispatch(activeWindow(i, !mode))}>
                                            Choose Charge
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </Fragment>
    )

}

export { ChargeMainFirst as default }