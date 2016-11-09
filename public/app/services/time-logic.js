angular.module("VirtualPetApp")
.service("TimeLogicService", ["$http", "authService", "$window", function($http, authService, $window) {
	// this.pet = [
	// 	sleep: {
	// 		last: "",
	// 		next: ""
	// 	},
	// 	feed: {
	// 		last: "",
	// 		next: ""
	// 	},
	// 	clean: {
	// 		last: "",
	// 		next: ""
	// 	},
	// 	exercise: {
	// 		last: "",
	// 		next: ""
	// 	},
	// 	nurse: {
	// 		last: "",
	// 		next: ""
	// 	],
	// };

	var millisecondHr = 3600000;

	this.actionBy = {
		sleep: {
			hours: 10,
			health: {
				missed: .25,
				acted: .125,
				effect: 0
			}, 
		},
		feed: {
			hours: 4,
			mood: {
				missed: .25,
				acted: .125,
				effect: 0
			},
			health: {
				missed: .25,
				acted: .125,
				effect: 0
			}
		},
		clean: {
			hours: millisecondHr/4,
			health: {
				missed: .25,
				effect: 0
			}
		},
		exercise: {
			hours: 4,
			health: {
				missed: .15,
				acted: .75,
				effect: 0
			}
		},
		nurse: {
			hours: 0,
			health: {
				acted: Math.random() * (1 - .5) + .5
			}
		}
	}


	// call onlogin, setTimeouts
	this.getStats = function() {
		var token = authService.getToken();
		var payload = JSON.parse($window.atob(token.split('.')[1]));
		var userEmail = payload._doc.email;
		console.log("about to make request for current users stats");
		console.log("get stats is using token:", token);
		console.log("get stats is using payload:", payload);
		$http.get('/api/users/getstats', userEmail)
		.then(function(res) {
			console.log("this is what came back");
			console.log("This came from the backend: " + res);
		});
	};

	this.saveStats = function(activity, lastDate, nextDate) {
		// finish put route for stats
		return $http.put("/api/users");
	};

	var feedTimeoutID;
	var playTimeoutID;
	var sleepTimeoutID;
	var exerciseTimeoutID;
	var cleanTimeoutID;
	var gameoverTimeoutID;

	// Interval or game loop
	// function feedTimeout(timeToFeed) {
	//   feedTimeoutID = window.setTimeout(function() {}
	//   	, timeToFeed);
	// }

	function isGameover(){
		//call health
	}

	this.mood;
	this.health;

}])
.factory('AuthInterceptor', ['authService', function(authService) {
  return {
    request: function(config) {
      var token = authService.getToken();
      if(token) {
        config.headers.Authorization = 'Bearer ' + token;
      }
      return config;
    }
  }
}]);