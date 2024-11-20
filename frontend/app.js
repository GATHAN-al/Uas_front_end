angular.module('hotelApp', ['ngRoute'])
    .config(function($routeProvider) {
        // Setup Routing
        $routeProvider
            .when('/login', {
                templateUrl: 'login.html',
                controller: 'AuthController'
            })
            .when('/register', {
                templateUrl: 'register.html',
                controller: 'AuthController'
            })
            .when('/home', {
                templateUrl: 'home.html',
                controller: 'HomeController',
                resolve: {
                    auth: function($q, $location, $window) {
                        if (!$window.localStorage.getItem('token')) {
                            $location.path('/login');
                            return $q.reject('Unauthorized');
                        }
                        return $q.resolve();
                    }
                }
            })
            .otherwise({
                redirectTo: '/login'
            });
    })
    .controller('AuthController', function($scope, $http, $window, $location) {
        // Login
        $scope.goToLogin = function() {
            $location.path('/login');
        };
        
        $scope.loginData = {};
        $scope.login = function() {
            $http.post('http://localhost:3000/login', $scope.loginData)
                .then(function(response) {
                    $window.localStorage.setItem('token', response.data.token);
                    $location.path('/home'); // Redirect to Home page
                })
                .catch(function(error) {
                    alert('Login Failed: ' + error.data);
                });
        };

        // Register
        $scope.goToRegister = function() {
            $location.path('/register');
        };
        
        $scope.registerData = {};
        $scope.register = function() {
            $http.post('http://localhost:3000/register', $scope.registerData)
                .then(function(response) {
                    alert('Registration Successful');
                    $location.path('/login'); // Redirect to Login page
                })
                .catch(function(error) {
                    alert('Registration Failed: ' + error.data);
                });
        };
    })
    .controller('HomeController', function($scope, $http, $window, $location) {
        // Home Page
        $scope.goToHome = function() {
            const token = $window.localStorage.getItem('token');
            if (token) {
                $http.get('http://localhost:3000/home', { headers: { 'x-auth-token': token } })
                    .then(function(response) {
                        $scope.message = response.data; // Show Home page message
                    })
                    .catch(function(error) {
                        alert('Error: ' + error.data);
                    });
            } else {
                alert('Please log in first');
            }
        };

        $scope.logout = function() {
            $window.localStorage.removeItem('token');
            $location.path('/login'); // Redirect to Login page after logout
        };
    });
