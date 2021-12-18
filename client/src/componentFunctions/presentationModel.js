const methods = {
    checkRegistrationInputs: (name, surname, email, password) => {

        const data = [
            name,
            surname,
            email,
            password
        ]

        let disableButton = false;
        
        data.forEach(d => {
            if(d === ''){
                disableButton = true;
            }
        })

        return disableButton;

    },
    checkLoginInputs: (email, password) => {

        const data = [
            email,
            password
        ]

        let disableButton = false;

        data.forEach((d) => {
            if(d === ''){
                disableButton = true;
            }
        })

        return disableButton

    }
}

export {methods as default}