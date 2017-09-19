angular.module('RouteControllers', [])

    .controller('HomeController', function($scope, LoggedInAPIService) {
      $scope.home = {};
      $scope.home.title = "Welcome To Angular Todo!"
      $scope.home.navUser = LoggedInAPIService.isLoggedIn();


    })

    .controller('LogoutController',function($scope, store, LoggedInAPIService){
        $scope.home = {}
        store.remove('username');
        store.remove('authToken');
        $scope.home.navUser = LoggedInAPIService.isLoggedIn();
        $scope.home.logout = "You have successfully logged out"

    })

    .controller('RegisterController', function($scope, $location, UserAPIService, store, LoggedInAPIService) {
        $scope.registrationUser = {};
        $scope.home = {};
        var URL = "https://morning-castle-91468.herokuapp.com/";
    
      
        $scope.submitForm = function() {
            if ($scope.registrationForm.$valid) {
                $scope.registrationUser.username = $scope.user.username;
                $scope.registrationUser.password = $scope.user.password;

                UserAPIService.callAPI(URL + "accounts/register/", $scope.registrationUser).then(function(results) {
                    $scope.data = results.data;
                    alert("You have successfully registered to Angular Todo");
                    $scope.login();
                }).catch(function(err) {
                    console.log(err);
                    alert("Registration failed, please try again with another username.");
                });
            }
        };

      $scope.login = function() {
            
            UserAPIService.callAPI(URL + "accounts/api-token-auth/", $scope.data).then(function(results) {
                $scope.token = results.data.token;
                store.set('username', $scope.registrationUser.username);
                store.set('authToken', $scope.token);
                $scope.home.navUser = LoggedInAPIService.isLoggedIn();
                $location.path("/todo"); 
            }).catch(function(err) {
                console.log(err);
            });
        }
    })


   .controller('LoginController', function($scope, $location, UserAPIService, store,LoggedInAPIService) {

        $scope.loginUser ={};  
        $scope.home = {};
        var url = "https://morning-castle-91468.herokuapp.com/";

        $scope.submitForm = function() {
            if ($scope.loginForm.$valid) {
                $scope.loginUser.username = $scope.user.username;
                $scope.loginUser.password = $scope.user.password;
                UserAPIService.callAPI(url + "accounts/api-token-auth/", $scope.loginUser).then(function(results) {
                    $scope.token = results.data.token;
                    store.set('username', $scope.loginUser.username);
                    store.set('authToken', $scope.token);
                    $scope.home.navUser = LoggedInAPIService.isLoggedIn();
                    $location.path("/todo");
                }).catch(function(err) {
                    console.log(err);
                    alert("can not log you in check your username & password");
                });
            }
        };
    })




    .controller('TodoController', function($scope, $location, TodoAPIService, store,LoggedInAPIService) {

        if(!store.get('authToken')){
            $location.path("accounts/register");
        }
        var URL = "https://morning-castle-91468.herokuapp.com/";

        $scope.authToken = store.get('authToken');
        $scope.username = store.get('username');

        $scope.todos = [];
        $scope.home = {};


        TodoAPIService.getTodos(URL + "todo/", $scope.username, $scope.authToken).then(function(results) {
            $scope.todos = results.data;
            console.log($scope.todos);
        }).catch(function(err) {
            console.log(err);
        });

        $scope.submitForm = function() {
            if ($scope.todoForm.$valid) {
                $scope.todo.username = $scope.username;
    
                $scope.todos.push($scope.todo);

                TodoAPIService.createTodo(URL + "todo/", $scope.todo, $scope.authToken).then(function(results) {
                    console.log(results);
            
                }).catch(function(err) {
                    console.log(err)
                });
            }
        }

        $scope.editTodo = function(id) {
            $location.path("/todo/edit/" + id);
        };

        $scope.deleteTodo = function(id) {
            TodoAPIService.deleteTodo(URL + "todo/" + id, $scope.username, $scope.authToken).then(function(results) {
                console.log(results);
            }).catch(function(err) {
                console.log(err);
            });
        }

        $scope.home.navUser = LoggedInAPIService.isLoggedIn();
    })

    .controller('EditTodoController', function($scope, $location, $routeParams, TodoAPIService, store) {
        var id = $routeParams.id;
        var URL = "https://morning-castle-91468.herokuapp.com/";
        $scope.home={};

        TodoAPIService.getTodos(URL + "todo/" + id, $scope.username, store.get('authToken')).then(function(results) {
            $scope.todo = results.data;
        }).catch(function(err) {
            console.log(err);
        });

        $scope.submitForm = function() {
            if ($scope.todoForm.$valid) {
                $scope.todo.username = $scope.username;

                TodoAPIService.editTodo(URL + "todo/" + id, $scope.todo, store.get('authToken')).then(function(results) {
                    $location.path("/todo");
                }).catch(function(err) {
                    console.log(err);
                })
            }
        }

        $scope.home.navUser = LoggedInAPIService.isLoggedIn();
    });