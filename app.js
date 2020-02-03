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

// Services
movieApp.service('movieService', function(){
  this.movie = '';
});

movieApp.service('searchMovieService', ['$resource', function ($resource) {

  this.getMovies = function(movie){
    var movieAPI = $resource(`https://www.omdbapi.com/?S=${movie}&apikey=thewdb`, { callback: "JSON_CALLBACK" }, { get: { method: "JSONP" }});
    return movieAPI.get({ q: movie });
  } 
}]);

// Controller
movieApp.controller('homeController', ['$scope', '$location', 'movieService', function($scope, $location,  movieService) {

  $scope.movie = movieService.movie;

  $scope.submit = function() {
    $location.path("/movie");
  }

  $scope.$watch('movie', function() {
    movieService.movie = $scope.movie; 
 });

}]);

movieApp.controller('movieController', ['$scope', 'movieService', 'searchMovieService', function($scope, movieService, searchMovieService) {

  $scope.movie = movieService.movie;  

  $scope.movieResult = searchMovieService.getMovies($scope.movie);

  console.log($scope.movieAPI);
  console.log($scope.movieResult);

  setTimeout(() => {
    console.log($scope.movieAPI);
    console.log($scope.movieResult);
  }, 4000);

}]);

// Directives
movieApp.directive('moviesResultCard', function(){
  return {
    restrict: 'E',
    templateUrl: 'directives/moviesResultCard.html',
    replace: true
  }
});