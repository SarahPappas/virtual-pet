(function() {
	angular.module("VirtualPetApp")
	.component("stats", {
		templateUrl: "app/components/stats/stats.html",
		controller: Stats,
		controllerAs: "stats"
	});

	function Stats ($http, $window, TimeLogicService, authService) {
		this.getStats = function(){
			$http.get('/investigate-user-token').then(function(res) {
				console.log("user token respose:", res);
			});

			var token = authService.getToken();
			var payload = JSON.parse($window.atob(token.split('.')[1]));
			var userEmail = payload._doc.email;
			console.log("about to make request for current users stats");
			
			console.log("get stats is using token:", token);
			console.log("get stats is using payload:", payload);

			$http.post('/api/users/getstats', userEmail)
			.then(function(res) {
				console.log("this is what came back");
				console.log("This came from the backend: " + res);
			});
		}

		this.getStats();
	};

	Stats.$inject = ['$http', '$window', 'TimeLogicService', 'authService'];
})()