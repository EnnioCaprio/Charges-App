import React, { useEffect, useState } from 'react';
import ChargesHeader from './ChargesHeader';
import ChargesMain from './ChargesMain';
import Overwork from '../Overwork/Overwork';
import { useSelector, useDispatch } from 'react-redux';
import { addCharges, addHoursCall, createPayloadCall, accumulateHours, addOverwork } from '../../actions/actionReducer';
import { checkIfFreeDay } from '../../util/sharedFunctions';
import Loading from '../Loading/Loading';
import chargePageMethods from '../../componentFunctions/chargePage';

const ChargesPage = ({ sendData, deleteConfirm, saveData, codes, charges }) => {

    const [distributeHours, setDistributeHours] = useState([]);

    const payloadState = useSelector(state => state.total);

    const dayState = useSelector(state => state.days);

    const periodState = useSelector(state => state.period);

    const overworkState = useSelector(state => state.overwork);

    const confirmState = useSelector(state => state.confirm);

    const loadingState = useSelector(state => state.loader);

    const employeeState = useSelector(state => state.employee);
    
    const hoursState = useSelector(state => state.hours);

    const dispatch = useDispatch();

    useEffect(() => {

        let count = 1;

        //This part is very important for updating redux states
        charges?.forEach((c, i) => {
            if (codes?.includes(c.code_charge)) {
                dispatch(addCharges(count, charges[i].name_charge));

                dispatch(addHoursCall(count, saveData[count - 1].days_keeper));

                dispatch(createPayloadCall(count, charges[i].code_charge, periodState, saveData[count - 1].days_keeper, employeeState.id_employee));

                calculateTotalHours(saveData[count - 1].days_keeper, count, 0, 0);

                calculateOverworkHours(c.name_charge, 0, saveData[count - 1].days_keeper);

                count++;
            }
        })

    }, [codes]);

    useEffect(() => {

        collectTotalHours();

    }, [overworkState]);

    const collectTotalHours = () => {
        
        const sortedArray = overworkState.sort((a, b) => a.id - b.id);

        const array = chargePageMethods.supportCollectHours(sortedArray, dayState?.period);

        setDistributeHours(array);

    }

    const calculateTotalHours = (data, position, i, start) => {

        let total = start;

        if (data.length > 0) {

            total += data[i].hours;

            if (i !== data.length - 1) {
                calculateTotalHours(data, position, i + 1, total);
            } else {
                dispatch(accumulateHours(position, total));
            }

        }

    }

    const calculateOverworkHours = (name, i, data) => {

        if (data?.length > 0) {

            dispatch(addOverwork(name, parseInt(data[i].day), data[i].hours));

            if (i !== data.length - 1) {
                calculateOverworkHours(name, i + 1, data);
            }

        }

    }

    if(loadingState){
        return <Loading />;
    }

    return (
        <div className="container-charge">
            <ChargesHeader
                sendData={sendData}
                deleteConfirm={deleteConfirm}
                saveData={saveData}
            />
            <ChargesMain
                dayState={dayState}
                distributeHours={distributeHours}
                setDistributeHours={setDistributeHours}
                saveData={saveData}
                charges={charges}
            />
            <Overwork
                days={dayState}
                free={checkIfFreeDay}
                distributeHours={distributeHours}
                setDistributeHours={setDistributeHours}
            />
            <div className="container-charge__save">
                { confirmState && <div className="container-charge__save__confirm"></div> }
                <div className="container-charge__save__button">
                    <button onClick={() => chargePageMethods.saveCharge(payloadState)} disabled={hoursState.length === 0}>Save Charges</button>
                </div>
            </div>
        </div>
    )

}

export { ChargesPage as default }