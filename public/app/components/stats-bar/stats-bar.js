(function() {
	angular.module("VirtualPetApp")
	.component("statsBar", {
		templateUrl: "app/components/stats-bar/stats-bar.html",
		controller: StatsBarCtrl,
		controllerAs: "StatsBarCtrl"
	});

	function StatsBarCtrl($http, ApplicationService, $scope, $state) {

		console.log("StatsBarCtrl loaded!");

		var StatsBarCtrl = this;
		StatsBarCtrl.healthBars = [];
		StatsBarCtrl.moodBars = [];

		

        // <-------- the only thing the feed needs to do is update server on click ------->
        StatsBarCtrl.data = ApplicationService;

        $scope.safeApply = function(fn) {
          var phase = this.$root.$$phase;
          if(phase == '$apply' || phase == '$digest') {
            if(fn && (typeof(fn) === 'function')) {
              fn();
            }
          } else {
            this.$apply(fn);
          }
        };

        $scope.$on("update", function(event, args) {
            $scope.safeApply();
            StatsBarCtrl.healthBars = [];
            StatsBarCtrl.moodBars = [];
            console.log("StatsBarCtrl health: " + StatsBarCtrl.data.health);
            for(var i = 0; i < StatsBarCtrl.data.health/10; i++){
            	StatsBarCtrl.healthBars.push(i);
            };
            for(var j = 0; j < StatsBarCtrl.data.mood/10; j++){
            	StatsBarCtrl.moodBars.push(j);
            }
            if(StatsBarCtrl.data.health >= 80){StatsBarCtrl.healthBarColor = "green"}
            else if(StatsBarCtrl.data.health >= 30){StatsBarCtrl.healthBarColor = "orange"}
            else{StatsBarCtrl.healthBarColor = "red"};
        	if(StatsBarCtrl.data.mood >= 80){StatsBarCtrl.moodBarColor = "green"}
            else if(StatsBarCtrl.data.mood >= 30){StatsBarCtrl.moodBarColor = "orange"}
            else{StatsBarCtrl.moodBarColor = "red"};
        })

        ApplicationService.startLoop();

      }


	StatsBarCtrl.$inject = ['$http', 'ApplicationService', '$scope', '$state'];
})()