(function() {
	angular.module("VirtualPetApp")
	.component("statsBar", {
		templateUrl: "app/components/stats-bar/stats-bar.html",
		controller: StatsBarCtrl,
		controllerAs: "StatsBarCtrl"
	});

    function StatsBarCtrl($http, ApplicationService, $scope, $state) {
        var statsBarCtrl = this;

        statsBarCtrl.data = ApplicationService;

        statsBarCtrl.setStats = function() {
            statsBarCtrl.healthBars = [];
            statsBarCtrl.moodBars = [];
            for(var i = 0; i < statsBarCtrl.data.health/10; i++){
            	statsBarCtrl.healthBars.push(i);
            };
            for(var j = 0; j < statsBarCtrl.data.mood/10; j++){
            	statsBarCtrl.moodBars.push(j);
            }
            if(statsBarCtrl.data.health >= 80){statsBarCtrl.healthBarColor = "green"}
            else if(statsBarCtrl.data.health >= 30){statsBarCtrl.healthBarColor = "orange"}
            else{statsBarCtrl.healthBarColor = "red"};
        	if(statsBarCtrl.data.mood >= 80){statsBarCtrl.moodBarColor = "green"}
            else if(statsBarCtrl.data.mood >= 30){statsBarCtrl.moodBarColor = "orange"}
            else{statsBarCtrl.moodBarColor = "red"};
        }
        
        statsBarCtrl.setStats();

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
            statsBarCtrl.setStats();
        })


        ApplicationService.startLoop();

      }


	StatsBarCtrl.$inject = ['$http', 'ApplicationService', '$scope', '$state'];
})()