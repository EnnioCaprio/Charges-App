import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login, saveProfileInformation } from '../../actions/actionReducer';
import PresentationModel from './PresentationModel';
import Loading from '../Loading/Loading';
import ErrorMessage from '../Error/ErrorMessage';
import employee from '../../requestsCalls/employee';

const Presentation = () => {

    const [loading, setLoading] = useState(true);

    const [form, setForm] = useState({ active: false, type: '' });

    const [error, setError] = useState(undefined);

    const dispatch = useDispatch();

    const history = useHistory();

    useEffect(() => {

        const checkLogin = async () => {

            const data = await employee.getEmployeeProfile();

            if (data.data?.getEmployeeProfile) {

                dispatch(login(true));

                dispatch(saveProfileInformation(data.data.getEmployeeProfile));

                history.push('/homepage');

            }

        }

        checkLogin();

        setLoading(false);

        return () => (loading === false);

    }, []);

    const registrationForm = async (e, name, surname, email, password) => {

        e.preventDefault()

        const data = await employee.registrationEmployee(name, surname, email, password);

        if (data.data?.registrationEmployee) {

            dispatch(login(data.data.registrationEmployee));

            const profile = await employee.getEmployeeProfile();

            dispatch(saveProfileInformation(profile.data.getEmployeeProfile));

            history.push('/homepage');

        } else {

            setError('This email was already used by another user');

        }

        setForm({ active: false, type: '' });

    }

    const loginForm = async (e, email, password) => {

        e.preventDefault();

        const data = await employee.employeeLogin(email, password);

        if (data.data?.loginEmployee) {

            dispatch(login(data.data.loginEmployee));

            const profile = await employee.getEmployeeProfile();

            dispatch(saveProfileInformation(profile.data.getEmployeeProfile));

            history.push('/homepage');

        } else {

            setError('Email or password wrong, please try again');

        }

        setForm({ active: false, type: '' });

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
        <div className="container-presentation">
            {
                error && receiveErrorMessage()
            }
            {
                form.active &&
                <PresentationModel
                    loginForm={loginForm}
                    registrationForm={registrationForm}
                    setForm={setForm}
                    form={form}
                />
            }
            <div className="container-presentation__center">
                <div className="container-presentation__center__button">
                    <button onClick={() => setForm({ active: true, type: 'registration' })}>Registration</button>
                </div>
                <div className="container-presentation__center__box">
                    <h1>OR</h1>
                </div>
                <div className="container-presentation__center__button">
                    <button onClick={() => setForm({ active: true, type: 'login' })}>Login</button>
                </div>
            </div>
        </div>
    )
}

export { Presentation as default }