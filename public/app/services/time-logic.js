angular.module("VirtualPetApp")
.service("TimeLogic", ["$http", function($http) {
	// this.pet = {
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
	// 	},
	// };

	var millisecondHr = 3600000;

	this.actionBy = {
		// 20 hours
		sleep: {
			hours: 20,
			mood: {
				missed: .25,
				acted: .15,
			}, 
		},
		feed: {
			hours: 2,
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
			hours:
		},
		nurse: 1
	}

	this.getStats = function() {
		return $http({
			url: "/api/users",
			method: "GET"
		}).then(function(res) {
			return res.data;
		});
	};

	this.saveStats = function(activity, lastDate, nextDate) {
		return $http.put("/api/users");
	};

	this.setMood = function() {

	};

	this.isFed = function() {

	};



}]);