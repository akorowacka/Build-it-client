app.config(function($stateProvider , $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider.state('home' , {
        url: '/',
        templateUrl:'app/views/home.html'
    });
});
