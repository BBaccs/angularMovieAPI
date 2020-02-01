// Module
const movieApp = angular.module('movieApp', ['ngRoute', 'ngResource']);

// ROUTES
movieApp.config(function ($routeProvider) {
   
  $routeProvider.when('/', {
      templateUrl: 'pages/home.html',
      controller: 'homeController'
  })
  
  .when('/movie', {
      templateUrl: 'pages/movie.html',
      controller: 'movieController'
  })
  
});

// Service
movieApp.service('movieService', function(){
  this.movie = 'Gladiator';
});

// Controller
movieApp.controller('homeController', ['$scope', 'movieService', function($scope, movieService) {

  $scope.movie = movieService.movie;

  $scope.$watch('movie', function() {
    movieService.movie = $scope.movie; 
 });

}]);

movieApp.controller('movieController', ['$scope', '$resource', 'movieService', function($scope, $resource, movieService) {

  $scope.movie = movieService.movie;  

  $scope.movieAPI = $resource("https://www.omdbapi.com/?S=Gladiator&apikey=thewdb", { callback: "JSON_CALLBACK" }, { get: { method: "JSONP" }});

  $scope.movieResult = $scope.movieAPI.get({ q: $scope.movie });

  console.log($scope.movieResult);

  setTimeout(() => {
    console.log($scope.movieResult);
  }, 4000);

}]);