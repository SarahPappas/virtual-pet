(function() {
	angular.module("VirtualPetApp")
	.component("nurse", {
		templateUrl: "app/components/nurse/nurse.html",
		controller: Nurse,
		controllerAs: "nurse"
	});

	function Nurse(ApplicationService, $scope) {
		var nurse = this;
		nurse.data = ApplicationService;
		nurse.isNurseAllowed = false;

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
			console.log("nurse allowed", nurse.isNurseAllowed);

		})

		console.log("nurse action infos", Number(ApplicationService.stats[4].last) + ApplicationService.actionInfos.nurse.msUntilAvailable);
		if(Date.now() < Number(ApplicationService.stats[4].last) + ApplicationService.actionInfos.nurse.msUntilAvailable)
		{
			nurse.isNurseAllowed =  false;
		} else {
			nurse.isNurseAllowed =  true;
		}


		nurse.healing = function(){
			ApplicationService.calcStats("nurse", "acted");
		}

		ApplicationService.startLoop();
	}
	Nurse.$inject = ["ApplicationService", "$scope"];
})()