import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import ChargesMainFirst from './ChargesMainFirst';
import ChargesMainSecond from './ChargesMainSecond';
import { checkIfFreeDay } from '../../util/sharedFunctions';

const ChargesMain = ({ dayState, distributeHours, setDistributeHours, saveData, charges }) => {

    const { window: { id, mode } } = useSelector(state => state);

    const chargesNodes = useSelector(state => state.charges);

    const confirmState = useSelector(state => state.confirm);

    return (
        <Fragment>
            <div className="container-charge__main">
                {
                    confirmState &&
                    <div className="container-charge__main__confirm" tabIndex="-1">

                    </div>
                }
                <ChargesMainFirst
                    chargesNodes={chargesNodes}
                    id={id} 
                    mode={mode}
                    charges={charges}
                />
                <ChargesMainSecond
                    dayState={dayState}
                    checkIfFreeDay={checkIfFreeDay} 
                    distributeHours={distributeHours} 
                    setDistributeHours={setDistributeHours} 
                    id={id}
                    charges={charges}
                    saveData={saveData}
                />
            </div>
        </Fragment>
    )

}

export { ChargesMain as default }