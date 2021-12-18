import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout, resetCharge, resetLocation, resetDaysInfo, resetProfileInformation, resetMode, resetPeriod } from '../../actions/actionReducer';
import employee from '../../requestsCalls/employee';

const Header = () => {

    const loginState = useSelector(state => state.login);

    const dispatch = useDispatch();

    const submitLogout = async () => {

        try{
            const data = await employee.employeeLogout(); 

            if(data.data?.logoutEmployee){

                dispatch(logout(false));

                dispatch(resetCharge());

                dispatch(resetLocation());

                dispatch(resetDaysInfo());

                dispatch(resetMode());

                dispatch(resetProfileInformation());

                dispatch(resetPeriod());

            }
        }catch(e){
            return e;
        }

    }

    return (
        <div className="container-header">
            <div className="container-header__main">
                <p>Time Management</p>
                {
                    loginState ? <button onClick={() => submitLogout()}>Logout</button> : ''
                }
            </div>
        </div>
    )
}

export { Header as default }