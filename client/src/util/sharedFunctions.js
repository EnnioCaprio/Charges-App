export const checkIfFreeDay = (index, divClass, periodState) => {

    let name;

    if(periodState?.weekDaysNames[index]?.freeDay){
        name = `${divClass}__free`;
    }else{
        name = divClass;
    }

    return name;

}

export const convertChargePayload = (payload) => {

    let result;

    if (payload.length < 2) {
        const { id, ...results } = payload[0];

        result = [results];
    } else {
        const results = payload.map(({ id, ...rest }) => rest);

        result = results;
    }

    return result;

}