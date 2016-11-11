(function() {
	angular.module("VirtualPetApp")
	.component("statsBar", {
		templateUrl: "app/components/stats-bar/stats-bar.html",
		controller: StatsBarCtrl,
		controllerAs: "StatsBarCtrl"
	});

	function StatsBarCtrl($http, ApplicationService, $scope, $state) {

		console.log("StatsBarCtrl loaded!");
		this.stats;
		this.getStats = function(){
			
		}


	}

	StatsBarCtrl.$inject = ['$http', 'ApplicationService', '$scope', '$state'];
})()