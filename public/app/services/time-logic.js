angular.module("VirtualPetApp")
.service("TimeLogicService", ["$http", function($http) {

	this.millisecondHr = 3600000;


	// constants 
	this.actionBy = {
		sleep: {
			hours: 10,
			health: {
				missed: .25,
				acted: .125,
			}, 
		},
		feed: {
			hours: 4,
			mood: {
				missed: .25,
				acted: .125,
			},
			health: {
				missed: .25,
				acted: .125,
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
				acted: .75,
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
	// gets all stats
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

	// var feedTimeoutID;
	// var playTimeoutID;
	// var sleepTimeoutID;
	// var exerciseTimeoutID;
	// var cleanTimeoutID;
	// var gameoverTimeoutID;

	// Interval or game loop
	// function feedTimeout(timeToFeed) {
	//   feedTimeoutID = window.setTimeout(function() {}
	//   	, timeToFeed);
	// }


	this.gameLoop = function() {

	}

	// game loop, where should this be called?
	setInterval(checkForUpdate, 60);

	function checkForUpdate() {
		// get stats from db, if they are 
		// do calculations
		// if stats are different broadcast to components for update
	}

	this.isGameover = function() {
		//call from heealth ctroller
	}

	this.mood;
	this.health;

}]);