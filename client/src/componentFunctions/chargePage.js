import requestsChargeOperation from '../requestsCalls/chargesOperation';

const methods = {
    convertArray: (result, j, period) => {

        const array = [];

        let i = 0

        if(period > 15){
            i = 15
        }

        //Create an array of object with number of days based on period
        for (i; i < period; i++) {
            array.push({
                day: (i + 1).toString(),
                hours: 0
            })
        }

        //Add the previous array to the days_keeper array
        for (let x = 0; x < array.length; x++) {
            result[j].days_keeper.push(array[x]);
        }

        result[j].days_keeper.sort((a, b) => a.day - b.day);

        let count = 0;

        //Remove duplicates inside days_keeper
        for(let z = 0; z < result[j].days_keeper.length; z++){
            if(result[j].days_keeper[z]?.day === result[j].days_keeper[z + 1]?.day){
                count += 1;
            }else{
                count = 0;
            }

            if(count > 0){
                result[j].days_keeper.splice((z + 1), 1)
            }
        }

        //If there are more code charges active for the same period, then repeat it for all of them
        if (j < result.length - 1) {
            methods.convertArray(result, j + 1, period);
        }
    },
    supportCollectHours: (sortedArray, period) => {
        let tempId = 0;

        let array = [];

        for (let i = 0; i < sortedArray.length; i++) {
            if (tempId === sortedArray[i].id) {
                if(period === 15){
                    array.map((a) => {
                        if(a.id === sortedArray[i].id){
                            a.totalHours += sortedArray[i].hours
                        }
                    })
                }else{
                    array.map((a) => {
                        if(a.id === sortedArray[i].id){
                            a.totalHours += sortedArray[i].hours
                        }
                    })
                }
            } else {
                tempId = sortedArray[i].id;

                array.push({
                    id: sortedArray[i].id,
                    totalHours: 0
                });

                i--;
            }
        }

        return array;
    },
    saveCharge: async (payloadState) => {

        if (payloadState.length > 0) {
            try{
                await requestsChargeOperation.createCharge(payloadState, 0);
            }catch(e){
                return e;
            }
        }

    }
}

export {methods as default}