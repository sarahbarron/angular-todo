angular.module('TodoApp', ['ngRoute', 'RouteControllers', 'UserService', 'angular-storage', 'TodoService', 'TodoDirective', 'LoggedInService']);

angular.module('TodoApp').config(function($locationProvider, $routeProvider) {

	$locationProvider.html5Mode(true);

	
	$routeProvider.when('/', {
		templateUrl: 'templates/home.html',
		controller: 'HomeController'
	})
	.when('/accounts/register', {
		templateUrl: 'templates/register.html',
		controller: 'RegisterController'
	})
	.when('/accounts/login',{
		templateUrl: 'templates/login.html',
		controller: 'LoginController'
	})
	.when('/todo', {
		templateUrl: 'templates/todo.html',
		controller: 'TodoController'
	})
	.when('/todo/edit/:id', {
	    templateUrl:'templates/edit-todo.html',
	    controller: 'EditTodoController'
	})

	.when('/logout',{
		templateUrl: 'templates/logout.html',
		controller: 'LogoutController'
	})
});