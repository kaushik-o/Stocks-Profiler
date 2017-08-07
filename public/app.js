const app = angular.module('stocksProfilerApp', ['ui.router', 'ui.bootstrap']);

app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: '/modules/home/home.tpl.html',
			controller: 'homeController'
        });
});

