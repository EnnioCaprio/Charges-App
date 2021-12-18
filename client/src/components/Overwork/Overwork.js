import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Overwork = ({ days, free, distributeHours, setDistributeHours }) => {

    const [totalOverwork, setTotalOverwork] = useState();

    const [totalHoursCharges, setTotalHoursCharges] = useState();

    const periodState = useSelector(state => state.days);

    const confirmState = useSelector(state => state.confirm);

    const overworkState = useSelector(state => state.overwork);

    useEffect(() => {

        returnTotalHours();

    }, [distributeHours]);

    useEffect(() => {

        if (overworkState.length === 0) {
            setDistributeHours([]);
        }

    }, [overworkState])

    const sendTime = (i, mode) => {

        let value;

        distributeHours.forEach(dH => {
            if (dH.id === i) {
                if (mode === 'normalHours') {
                    value = dH.totalHours;
                } else {
                    value = dH.totalHours - 8;
                }
            }
        })

        if (value < 0 || value === 0) {
            value = '';
        }

        return value;

    }

    const returnTotalHours = () => {

        let totalValue = 0;

        let totalValue2 = 0

        distributeHours.forEach((dH) => {
            if (dH.totalHours > 8) {
                totalValue2 += (dH.totalHours - 8)
            }

            totalValue += dH.totalHours
        })

        setTotalHoursCharges(totalValue);

        setTotalOverwork(totalValue2)

    }

    const returnSpaces = () => {

        return [...Array(days?.periodLength)].map((d, i) => (
            <div key={i} className={free(i, "container-charge__overwork__second__days__day")}>
                {
                    periodState?.period === 15 ?
                        sendTime((i + 1), 'normalHours')
                        :
                        sendTime((i + 16), 'normalHours')
                }
            </div>
        ))

    }

    const returnSpacesOvertime = () => {

        return [...Array(days?.periodLength)].map((d, i) => (
            <div key={i} className={free(i, "container-charge__overwork__second__days__day")}>
                {
                    periodState?.period === 15 ?
                        sendTime((i + 1), 'overworkHours')
                        :
                        sendTime((i + 16), 'overworkHours')
                }
            </div>
        ))

    }

    return (
        <div className="container-charge__overwork">
            {
                confirmState && <div className="container-charge__overwork__confirm"></div>
            }
            <div className="container-charge__overwork__first">
                <div>
                    <p>Work Schedule</p>
                </div>
                <div>
                    <p>Daily Overtime</p>
                </div>
            </div>
            <div className="container-charge__overwork__second">
                <div className="container-charge__overwork__second__days">
                    <div>
                        {returnSpaces()}
                    </div>
                    <div>
                        {returnSpacesOvertime()}
                    </div>
                </div>
                <div className="container-charge__overwork__second__total">
                    <div>
                        {
                            totalHoursCharges
                        }
                    </div>
                    <div>
                        {
                            totalOverwork
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export { Overwork as default }