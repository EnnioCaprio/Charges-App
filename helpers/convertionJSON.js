const convertData = (data) => {

    let convertedData = data;

    convertedData.map(x => {
        if(x.days_keeper){
            return x.days_keeper = JSON.stringify(x.days_keeper);
        }else{
            return x.days_location = JSON.stringify(x.days_location);
        }
    })

    return convertedData;

}

module.exports = { convertData }