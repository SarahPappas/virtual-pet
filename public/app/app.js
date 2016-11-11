angular.module("VirtualPetApp", ["ui.router"])
.config(["$stateProvider", "$urlRouterProvider", "$locationProvider", '$httpProvider', function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
			$urlRouterProvider.otherwise("/");

	$stateProvider
	.state("home", {
		url: "/",
		templateUrl: "app/views/home.html"
	})
	.state("play", {
		url: "/play/{activity}",
		templateUrl: "app/views/play.html"
	})
	.state("gameover", {
		url: "/gameover",
		templateUrl: "/app/views/newpet.html"
	})
	.state('backPlay', {
		url: "/play",
		templateUrl: '/app/views/play.html'
	})

	$locationProvider.html5Mode(true);
}])
.config(["$httpProvider", function($httpProvider){
  $httpProvider.interceptors.push("AuthInterceptor");
}]) 
.run(["$rootScope", "$state", function($rootScope, $state) {
	$rootScope.state = $state;
}]);