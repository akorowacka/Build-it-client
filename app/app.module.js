var app = angular.module("BuildIt", ['ui.router', 'ngMaterial', 'restangular', 'ngCookies']);

app.constant("appConfig", {
        "API": "http://localhost/api"
});

app.config(function(RestangularProvider) {
    RestangularProvider.setBaseUrl('http://localhost/api');
});
