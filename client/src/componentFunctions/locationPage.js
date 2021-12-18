import axios from 'axios';

const methods = {
    checkError: (count, bool, daysLocation) => {

        let temp1 = [];

        daysLocation[count].days.map(day => {
            temp1.push(day);
        })

        daysLocation[count + 1].days.some(day => {
            if (temp1.includes(day)) {
                bool = true;
            }
        })

        if ((count + 1) === daysLocation.length - 1) {
            return bool;
        }

    },
    modifyColor: (id, lId, daysLocation) => {

        let boolName = false;

        let name = '';

        daysLocation[id - 1].days.forEach(day => {
            if (day === lId) {
                boolName = true;
            }
        })

        if (boolName) {
            name = 'buttonActive';
        } else {
            name = 'buttonDisable';
        }

        return name;

    },
    getLocationData: async (latitude, longitude) => {

        try{
            const location = await axios(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=c67eff2f985c405f9a07577d7f7484c2`);

            //console.log('location', location);

            /*const { country, county } = location.data.results[0].components;

            return {
                country,
                county
            }*/

            return location.data;
        }catch(e){
            return e;
        }
    }
}

export { methods as default }