angular.module('TodoApp',['ngRoute', 'RouteControllers']);

angular.module('TodoApp').config(function($locationProvider,$routeProvider){
	$locationProvider.html5Mode(true); // Enable href routing without hashes

	$routeProvider.when('/',{
		templateURL: 'templates/home.html',
		controller: 'HomeController'
	});
	.when('/accounts/register', {
		templateURL: 'templates/register.html',
		controller: 'RegisterController'
	});
});
