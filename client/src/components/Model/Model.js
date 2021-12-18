import React from 'react';
import { useDispatch } from 'react-redux';
import { activeWindow } from '../../actions/actionReducer';

const Model = ({id, open, manageCharges, charges}) => {

    const dispatch = useDispatch();

    const convertHours = (input) => {

        const date = new Date(parseInt(input));

        const year = date.getFullYear();

        let month = parseInt(date.getMonth() + 1);

        if(month < 10){
            month = '0' + month;
        }

        const day = date.getDate();

        return `${year}-${month}-${day}`;

    }

    return (
        <div className="container-window">
            <div className="container-window__exit">
                <button onClick={() => {
                    dispatch(activeWindow(id, !open))
                }}>X</button>
            </div>
            <div className="container-window__description">
                <ul>
                    <li>Name</li>
                    <li>Code</li>
                    <li>Date creation</li>
                </ul>
            </div>
            <div className="container-window__info">
                <div data-testid="table-charges">
                    {
                        charges?.map((c, i) => (
                            <ul key={c.id_charge} onClick={() => {
                                manageCharges(id + 1, c.name_charge, c.code_charge)
                                return dispatch(activeWindow(id, !open))
                            }}>
                                <li>{c.name_charge}</li>
                                <li>{c.code_charge}</li>
                                <li>{convertHours(c.created_at)}</li>
                            </ul>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export { Model as default }