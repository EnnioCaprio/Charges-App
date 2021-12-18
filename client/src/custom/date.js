import moment from 'moment';

export const getNameDays = (day, month, year) => {

    const dayNames = [];

    let tempDay = day;

    if(tempDay === 15){
        tempDay = 1;
    }else{
        tempDay = 16
    }

    let dayName = undefined;

    let j = 0;

    for(let i = tempDay - 1; i < day; i++){
        if((i + 1) < 10){
            dayName = moment(`${year}-${month}-0${i + 1}`).format('dddd');
        }else{
            dayName = moment(`${year}-${month}-${i + 1}`).format('dddd');
        }

        dayNames[j] = {
            freeDay: dayName === 'Sunday' || dayName === 'Saturday' ? true : false,
            dayName: dayName.substring(0, 3)
        }

        j++;
    }

    return dayNames;

}

export const getDateResult = (value, check, currentDate, mode) => {

    const date = new Date();

    let currentDay, currentMonth, currentYear, period, fullDate;

    //If check is true, then it will render the current month and year otherwise the function will calculate the new date
    if (check) {

        currentDay = date.getDate();

        currentMonth = date.getMonth();

        currentYear = date.getFullYear();

        if (currentDay < 15) {
            period = 15;
        } else {
            period = moment().endOf('month').format('DD');
        }

    } else {

        const current = currentDate.split('/');

        currentYear = parseInt(current[2]);

        currentDay = parseInt(current[0]);

        //This part of the function manages the two buttons '<' and '>'
        if (currentDay === 15) {
            period = moment().endOf('month').format('DD'); 
            if(mode === 'next'){
                currentMonth = parseInt(current[1]) - 1;
            }else{
                currentMonth = parseInt(current[1]) - 1 + value;
            }
        } else {
            period = 15;
            if(mode === 'next'){
                currentMonth = parseInt(current[1]) - 1 + value;
            }else{
                currentMonth = parseInt(current[1]) - 1;
            }
        }

        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }

        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }

    }

    const months = moment.months();

    //I retrieved the months from moment and then map them inside a new array of objects
    //with two properties, month and number, the number will be useful for retriving the
    //correct month, by using the value inside currentMonth and compare it with number
    const checkedMonth = months.map((m, i) => {
        if (i + 1 < 10) {
            return { month: m, number: `0${i + 1}` }
        } else {
            return { month: m, number: i + 1 }
        }
    });

    if(currentDay === 15){
        period = moment(`${currentYear}-${checkedMonth[currentMonth].number}`).daysInMonth();
    }

    if (check) {
        fullDate = `${period}/${checkedMonth[currentMonth].number}/${currentYear}`;
    } else {
        fullDate = `${period}/${checkedMonth[currentMonth].number}/${currentYear}`;
    }

    const weekDaysNames = getNameDays(period, checkedMonth[currentMonth].number, currentYear);

    return {
        fullDate,
        period,
        weekDaysNames
    }
}