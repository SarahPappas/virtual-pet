angular.module("VirtualPetApp")
.service("ApplicationService", ["$http", "$rootScope", function($http, $rootScope) {

	this.msPerHour = 1000 * 60 * 60;

	// constants 
	this.actionInfos = {
		sleep: {
		},
		feed: {
			msUntilNeeded: 4 * this.msPerHour,
			msUntilMissed: 5 * this.msPerHour,
			moodDeltas: {
				missed: -20,
				acted: 10,
			},
			healthDeltas: {
				missed: -20,
				acted: 10,
			}
		},
		clean: {
		},
		exercise: {
		},
		nurse: {
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

	// game loop, where should this be called?
	setInterval(checkForUpdate, 3000);

	function checkForUpdate() {
		this.getStats()
			.then(function(stats) {
				var timeLastExecuted = new Date().now();
				var now = new Date().now();
				var actionInfo = this.actionInfos.feed;
				var msUntilMissed = actionInfo.msUntilMissed;
				if(now > timeLastExecuted + msUntilMissed) {
					this.mood += actionInfo.moodDeltas.missed;
					this.health += actionInfo.healthDeltas.missed;
				}
			}.bind(this));

		// get stats from db 
		// do calculations
		// if missed acition broadcast "miss" to stats component
			//>> if currentTime-nextTime = 0	
			// then sets action's next time
		// if stats are different broadcast to components for update
	}

	this.mood = 100;
	this.health = 100;
}]);