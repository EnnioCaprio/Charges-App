// windowReducer useReducer

export const activeWindow = (id, mode) => {
    return {
        type: 'ACTIVE_WINDOW',
        id,
        mode
    }
}

// chargesReducer

export const addCharges = (id, fullName) => {
    return {
        type: 'ADD_CHARGE',
        id,
        fullName
    }
}

export const updateCharge = (id, fullname) => {
    return {
        type: 'UPDATE_CHARGE',
        id,
        fullname
    }
}

// hoursReducer

export const addHoursCall = (id, days) => {
    return {
        type: 'ADD_HOURS_CALL',
        id,
        days
    }
}

export const addictionalHours = (cId, day, hours) => {
    return {
        type: 'ADDICTIONAL_HOURS',
        cId,
        day,
        hours
    }
}

export const modifiedHours = (cId, structure, hours) => {
    return {
        type: 'MODIFIED_HOURS',
        cId,
        structure,
        hours
    }
}

export const createAnotherArray = (id) => {
    return {
        type: 'CREATE_ANOTHER_ARRAY',
        id
    }
}

// totalReducer

export const createPayload = (id, code_charge, period, id_employee) => {
    return {
        type: 'CREATE_PAYLOAD',
        id,
        code_charge,
        period,
        id_employee
    }
}

export const updatePayload = (id, days_keeper) => {
    return {
        type: 'UPDATE_PAYLOAD',
        id,
        days_keeper
    }
}

export const updatePayloadCode = (id, code_charge) => {
    return {
        type: 'UPDATE_PAYLOAD_CODE',
        id,
        code_charge
    }
}

export const createPayloadCall = (id, code_charge, period, days, id_employee) => {
    return {
        type: 'CREATE_PAYLOAD_CALL',
        id,
        code_charge,
        period,
        days,
        id_employee
    }
}

// totalHoursReducer

export const accumulateHours = (id, hours) => {
    return {
        type: 'ACCUMULATE_HOURS',
        id,
        hours
    }
}

export const updateAccumulatedHours = (id, hours) => {
    return {
        type: 'UPDATE_ACCUMULATED_HOURS',
        id,
        hours
    }
}

// apply to all charges

export const resetCharge = () => {
    return {
        type: 'RESET_CHARGE'
    }
}

// locationChargeReducer

export const createLocationPayload = (id, location_period, id_location, id_employee) => {
    return {
        type: 'CREATE_LOCATION_PAYLOAD',
        id,
        location_period,
        id_location,
        id_employee
    }
}

export const createLocationCall = (id, location_period, days_location, id_location, id_employee) => {
    return {
        type: 'CREATE_LOCATION_CALL',
        id,
        location_period,
        days_location,
        id_location,
        id_employee
    }
}

export const updateLocationPayload = (id, days) => {
    return {
        type: 'UPDATE_LOCATION_PAYLOAD',
        id,
        days
    }
}

// locationReducer

export const addLocationDay = (id, day) => {
    return {
        type: 'ADD_LOCATION_DAY',
        id,
        day
    }
}

export const removeLocationDay = (id, day) => {
    return {
        type: 'REMOVE_LOCATION_DAY',
        id,
        day
    }
}

export const addTemporaryLocations = (id, days) => {
    return {
        type: 'ADD_TEMPORARY_LOCATIONS',
        id,
        days
    }
}

// overworkReducer

export const addOverwork = (charge, id, hours) => {
    return {
        type: 'ADD_OVERWORK',
        charge,
        id,
        hours
    }
}

export const updateOverwork = (charge, id, hours) => {
    return {
        type: 'UPDATE_OVERWORK',
        charge,
        id,
        hours
    }
}

// daysReducer

export const addDaysInfo = (periodLength, period, weekDaysNames) => {
    return {
        type: 'ADD_DAYS_INFO',
        periodLength,
        period,
        weekDaysNames
    }
}

export const resetDaysInfo = () => {
    return {
        type: 'RESET_DAYS_INFO'
    }
}

// periodReducer

export const insertPeriod = (period) => {
    return {
        type: 'INSERT_PERIOD',
        period
    }
}

export const resetPeriod = () => {
    return {
        type: 'RESET_PERIOD'
    }
}

// loginReducer

export const login = (bool) => {
    return {
        type: 'LOGIN',
        data: bool
    }
}

export const logout = (bool) => {
    return {
        type: 'LOGOUT',
        data: bool
    }
}

// confirmReducer

export const addConfirm = (data) => {
    return {
        type: 'ADD_CONFIRM',
        data
    }
}

export const removeConfirm = (data) => {
    return {
        type: 'REMOVE_CONFIRM',
        data
    }
}

// employeeReducer

export const saveProfileInformation = ({ id_employee, name, surname, email }) => {
    return {
        type: 'SAVE_PROFILE_INFORMATION',
        id_employee,
        name,
        surname,
        email
    }
}

export const resetProfileInformation = () => {
    return {
        type: 'RESET_PROFILE_INFORMATION'
    }
}

// modeReducer

export const updateMode = (page, active) => {
    return {
        type: 'UPDATE_MODE',
        page,
        active
    }
}

export const resetMode = () => {
    return {
        type: 'RESET_MODE'
    }
}

// apply to all locations

export const resetLocation = () => {
    return {
        type: 'RESET_LOCATION'
    }
}