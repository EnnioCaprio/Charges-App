const validateInputs = ({name, surname, email, password}) => {
    
    let errors = {};

    if(name.trim() === ''){
        errors.name = "Name cannot be empty"
    }

    if(surname.trim() === ''){
        errors.surname = "Surname cannot be empty"
    }

    if(email.trim() === ''){
        errors.email = "Email cannot be empty"
    }

    if(password.trim() === ''){
        errors.password = 'Password cannot be empty'
    }

    return {
        errors
    }
}

module.exports = {
    validateInputs
}