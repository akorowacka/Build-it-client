app.config(function($stateProvider , $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('home' , {
            url: '/',
            templateUrl:'app/views/home.html'
        })
        .state('list', {
            url: '/list',
            templateUrl:'app/views/list.html'
        });
});
