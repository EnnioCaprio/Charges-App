import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import presentationModelMethods from '../../componentFunctions/presentationModel';

const PresentationModel = ({ loginForm, registrationForm, setForm, form }) => {

    const [firstName, setFirstName] = useState('');

    const [secondName, setSecondName] = useState('');

    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');

    const googleLogin = async () => {

        window.open(`${process.env.REACT_APP_AUTH}/auth/google`, '_self')

    }

    return (
        <div className="container-model">
            <div className="container-model__box">
                <div className="container-model__box__exit">
                    <button onClick={() => setForm({ active: false, type: '' })}>X</button>
                </div>
                <div className="container-model__box__header">
                    {
                        form.type === 'registration' ? 
                        <h3>OAUTH REGISTRATION</h3>
                        :
                        <h3>OAUTH LOG-IN</h3>
                    }
                </div>
                <div className="container-model__box__oauth">
                    <div className="container-model__box__oauth__google" onClick={() => googleLogin()}>
                        <div className="container-model__box__oauth__google__icon">
                            <FontAwesomeIcon icon={faGoogle} style={{color: '#ffffff'}} />
                        </div>
                        <div className="container-model__box__oauth__google__info">
                            {
                                form.type === 'registration' ?
                                <p>Sign up with Google</p>
                                :
                                <p>Sign in with Google</p>
                            }
                        </div>
                    </div>
                </div>
                <div className="container-model__box__login">
                    {
                        form.type === 'registration' ?
                        <h3>REGISTRATION</h3>
                        :
                        <h3>LOG-IN</h3>
                    }
                    {
                        form.type === 'registration' ?
                            <form onSubmit={(e) => registrationForm(e, firstName, secondName, email, password)}>
                                <input type="text" value={firstName || ''} onChange={(e) => setFirstName(e.target.value)} placeholder="firstName" />
                                <input type="text" value={secondName || ''} onChange={(e) => setSecondName(e.target.value)} placeholder="secondName" />
                                <input type="text" value={email || ''} onChange={(e) => setEmail(e.target.value)} placeholder="email" />
                                <input type="text" value={password || ''} onChange={(e) => setPassword(e.target.value)} placeholder="password" />
                                <button disabled={presentationModelMethods.checkRegistrationInputs(firstName, secondName, email, password)}>Registrate</button>
                            </form>
                            :
                            <form onSubmit={(e) => loginForm(e, email, password)}>
                                <input type="text" value={email || ''} onChange={(e) => setEmail(e.target.value)} placeholder="email" />
                                <input type="text" value={password || ''} onChange={(e) => setPassword(e.target.value)} placeholder="password" />
                                <button disabled={presentationModelMethods.checkLoginInputs(email, password)}>Log-in</button>
                            </form>
                    }
                </div>
            </div>
        </div>
    )

}

export { PresentationModel as default }