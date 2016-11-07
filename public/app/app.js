angular.module("VirtualPetApp", ["ui.router"])
.config(["$stateProvider", "$urlRouterProvider", "$locationProvider", function($stateProvider, $urlRouterProvider, $locationProvider) {
	$urlRouterProvider.otherwise("/");

	$stateProvider
	.state("home", {
		url: "/",
		templateUrl: "app/views/home.html"
	})
	.state("signup", {
		url: "/signup",
		templateUrl: "app/views/signup.html"
	})
	.state("play", {
		url: "/play/{activity}",
		templateUrl: "app/views/play.html"
	})

	$locationProvider.html5Mode(true);
}])
.run(["$rootScope", "$state", function($rootScope, $state) {
	$rootScope.state = $state;
}]);