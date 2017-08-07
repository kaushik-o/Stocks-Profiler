var getStartDateString = () => {
    let date = new Date(),
        lastYear = (date.getFullYear() - 1).toString(),
        currentMonth = date.getMonth() + 1,
        currentDate = date.getDate();
    
    currentMonth = (currentMonth < 10) ? '0' + currentMonth.toString() : currentMonth.toString();
    currentDate = (currentDate < 10) ? '0' + currentDate.toString() : currentDate.toString();

    let startDateString = lastYear + '-' + currentMonth + '-' + currentDate;
    return startDateString;
}

var computeVariance = (data) => {
    let mean = getMean(data);
        
    let squaredSum = data.reduce((sum, value) => {
        let diff = value[1] - mean;
        sum += diff * diff;
        return sum;
    }, 0);

    return (squaredSum/data.length).toFixed(2);
};

function getMean(data) {
    let sum = data.reduce((sum, value) => {
        sum += value[1];
        return sum;
    }, 0);
    
    return sum/data.length;
}

var computeRisk2 = (data) => {
    /**
     * data is ordered from most recent to least recent week 
     */

    let trend1, trend2, trend3, trend4;  
    
    trend1 = ((data[0][1] - data[12][1]) / data[12][1]) * 100;
    trend2 = ((data[13][1] - data[25][1]) / data[25][1]) * 100;
    trend3 = ((data[38][1] - data[26][1]) / data[26][1]) * 100;
    trend4 = ((data[51][1] - data[39][1]) / data[39][1]) * 100;

    let weightedTrend = (0.4 * trend1) + (0.3 * trend2) + (0.2 * trend3) +  (0.1 * trend4);

    return weightedTrend.toFixed(2);
};

module.exports.getStartDateString = getStartDateString;
module.exports.computeVariance = computeVariance; 
module.exports.computeRisk2 = computeRisk2;
