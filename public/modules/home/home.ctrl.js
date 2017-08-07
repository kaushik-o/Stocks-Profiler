app.controller('homeController', ['$scope', 'stockQuotesService', '$timeout', function($scope, stockQuotesService, $timeout) {
    $scope.exchanges = [{
        value: 'WIKI',
        label: 'US Stocks'
    },
    {
        value: 'NSE',
        label: 'NSE',
    },
    {    
        value: 'BSE',
        label: 'BSE' 
    }];

    $scope.stocks = [];
    $scope.isFieldBlank = true;
        
    $scope.tickerEntered = (e) => {
        if($scope.ticker.length > 1 && e.which === 13) {
            getStockQuotes();
        }
        else{ 
            if($scope.ticker.length > 0) {
                $scope.isFieldBlank = false;
            }    
            else {
                $scope.isFieldBlank = true;
            }     
        }
    };

    $scope.addButtonClicked = () => {
        if($scope.ticker) {
            getStockQuotes();
        }
    };

    $scope.stockDeleteClicked = (index) => {
        $scope.stocks.splice(index, 1);
    };

    var getStockQuotes = () => {
        $scope.loading = true;
        stockQuotesService.getHistoricalQuotes($scope.ticker, $scope.exchange)
            .then(function(resp) {
                $scope.stocks.push(resp.data);
                $scope.loading = false;
                $scope.ticker = '';
            }, function(err) {
                $scope.error = true;
                if(err.data && err.data.errorMessage) {
                    $scope.errorMsg = err.data.errorMessage;
                }
                else {
                    $scope.errorMsg = 'Some unknown error occured.';
                }    
                $scope.loading = false;
                $scope.ticker = '';
                $timeout(function() {
                    $scope.error = false;
                }, 10000);
            });
    };
}]);

