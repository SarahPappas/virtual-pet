angular.module("VirtualPetApp")
.service("TimeLogicService", ["$http", function($http) {
	this.pet = [
		sleep: {
			last: "",
			next: ""
		},
		feed: {
			last: "",
			next: ""
		},
		clean: {
			last: "",
			next: ""
		},
		exercise: {
			last: "",
			next: ""
		},
		nurse: {
			last: "",
			next: ""
		],
	};

	var millisecondHr = 3600000;

	this.actionBy = {
		sleep: {
			hours: 10,
			mood: {
				missed: .25,
				acted: .15,
			}, 
		},
		feed: {
			hours: 4,
			mood: {
				missed: .25,
				acted: .15,
			}
		},
		clean: {
			hours: millisecondHr/4,
			health: {
				missed: .25,
			}
		},
		exercise: {
			hours: 4
			health: {
				missed: .15,
				acted: .5
			}
		},
		nurse: {
			hours: 0;
			health: {
				acted: Math.random() * (1 - .5) + .5;
			}
		}
	}

	// call onlogin, setTimeouts
	this.getStats = function() {
		return $http({
			url: "/api/users",
			method: "GET"
		}).then(function(res) {
			return res.data;
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

}]);