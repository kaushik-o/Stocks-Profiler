app.service('stockQuotesService', function($http, $q) {
    this.getHistoricalQuotes = function(ticker, exchange) {
        var deferred = $q.defer();

        $http({
            method: 'GET',
            url: 'quotes',
            params: {
                ticker: ticker,
                exchange: exchange
            }
        }).then(
            function(resp){
                deferred.resolve(resp);
            },
            function(err){
                deferred.reject(err);
            }
        );

        return deferred.promise;
    }
});
