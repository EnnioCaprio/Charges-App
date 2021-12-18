import { combineReducers } from 'redux';
import windowReducer from './windowReducer';
import chargesReducer from './chargesReducer';
import hoursReducer from './hoursReducer';
import totalReducer from './totalReducer';
import totalHoursReducer from './totalHoursReducer';
import locationChargeReducer from './locationChargeReducer';
import overworkReducer  from './overworkReducer';
import locationReducer from './locationsReducer';
import daysReducer from './daysReducer';
import periodReducer from './periodReducer';
import loginReducer from './loginReducer';
import confirmReducer from './confirmReducer';
import modeReducer from './modeReducer';
import employeeReducer from './employeeReducer';

const allReducers = combineReducers({
    window: windowReducer,
    charges: chargesReducer,
    hours: hoursReducer,
    total: totalReducer,
    totalHours: totalHoursReducer,
    locationCharge: locationChargeReducer,
    location: locationReducer,
    overwork: overworkReducer,
    days: daysReducer,
    mode: modeReducer,
    period: periodReducer,
    login: loginReducer,
    employee: employeeReducer,
    confirm: confirmReducer
});

export default allReducers;