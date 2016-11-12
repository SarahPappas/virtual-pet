(function() {
	angular.module("VirtualPetApp")
	.component("statsBar", {
		templateUrl: "app/components/stats-bar/stats-bar.html",
		controller: StatsBarCtrl,
		controllerAs: "StatsBarCtrl"
	});

	function StatsBarCtrl($http, ApplicationService, $scope, $state) {

		console.log("StatsBarCtrl loaded!");
		this.healthBars = [];
		this.moodBars = [];
		this.data = ApplicationService;
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
      this.healthBars = [];
      this.moodBars = [];
      this.healthBarCount = this.data.health/10;
      this.moodBarCount = this.data.mood/10;
      for(var i = 0; i < this.healthBarCount; i++){
      	this.healthBars.push(i);
      }
      for(var j = 0; j < this.moodBarCount; j++) {
      	this.moodBars.push(j);
      }
      var hbars = document.getElementsByClassName("health-bar");
      console.log("those hbars: " + hbars);
      if(hbars.length >= 8){
      	for (var k = 0; k < hbars.length; k++){
      		hbars[k].style.backgroundColor = "green";
      	}
      }
      else if(hbars.length >= 4){
      	for (var k = 0; k < hbars.length; k++){
      		hbars[k].style.backgroundColor = "orange";
      	}
      }
      else if(hbars.length < 4){
      	for (var k = 0; k < hbars.length; k++){
      		hbars[k].style.backgroundColor = "red";
      	}
      }
    }.bind(this))

      	this.healthBarCount = this.data.health/10;
      	this.moodBarCount = this.data.mood/10;
      	for(var i = 0; i < this.healthBarCount; i++){
      		this.healthBars.push(i);
      	}
      	for(var j = 0; j < this.moodBarCount; j++) {
      		this.moodBars.push(j);
      	}
      	      var hbars = document.getElementsByClassName("health-bar");
      console.log("those hbars: " + hbars);
      if(hbars.length >= 8){
      	for (var k = 0; k < hbars.length; k++){
      		hbars[k].style.backgroundColor = "green";
      	}
      }
      else if(hbars.length >= 4){
      	for (var k = 0; k < hbars.length; k++){
      		hbars[k].style.backgroundColor = "orange";
      	}
      }
      else if(hbars.length < 4){
      	for (var k = 0; k < hbars.length; k++){
      		hbars[k].style.backgroundColor = "red";
      	}
      }
      }


	StatsBarCtrl.$inject = ['$http', 'ApplicationService', '$scope', '$state'];
})()