const express = require('express');
const request = require('request');
const stockProfiler = require('./stock-profiler');
const apiKey = 'mpz1j-YG5bC1peETyL7k';
const dataResolution = 'weekly';
const dataColumnIndex = 4;

const app = express();

app.use(express.static(__dirname + '/public'));

app.listen(3000, function () {
    console.log('Server listening on port 3000');
});

app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/index.html', function(err) {
        console.log(err);
    });
});

app.get('/quotes', function(req, res){
    const ticker = req.query.ticker,
        exchange = req.query.exchange,
        startDateString = stockProfiler.getStartDateString();

    const options = {
        url: 'https://www.quandl.com/api/v3/datasets/' + exchange + '/' + ticker + '.json',
        qs: {
            collapse: dataResolution,
            column_index: dataColumnIndex,
            start_date: startDateString,
            api_key: apiKey
        },
        method: 'GET'
    };
    
    request(options, (err, response, body) => {
        var responsePayload = {
            error: false
        };
        
        if(err) {
            responsePayload.error = true;
            responsePayload.errorMessage = 'Internal server error';
            res.status(500).send(responsePayload);
        }

        body = JSON.parse(body);

        if(body.quandl_error) {
            responsePayload.error = true;
            responsePayload.errorMessage = body.quandl_error.message;
        }
        else {
            responsePayload.variance = stockProfiler.computeVariance(body.dataset.data);
            responsePayload.risk2 = stockProfiler.computeRisk2(body.dataset.data);
            responsePayload.ticker = body.dataset.dataset_code;
            responsePayload.exchange = body.dataset.database_code;
            let description = body.dataset.name;
            if(description.indexOf('Prices') > 0) {
                description = description.substring(0, description.indexOf('Prices'));
            }    
            responsePayload.description = description;
        }    

        res.status(response.statusCode).send(responsePayload);
    });
    
});



