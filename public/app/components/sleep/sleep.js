(function() {
	angular.module("VirtualPetApp")
	.component("sleep", {
		templateUrl: "app/components/sleep/sleep.html",
		controller: SleepCtrl,
		controllerAs: "sleep"
	});

	function SleepCtrl(ApplicationService, $scope) {
    console.log('sleep cycle awakened')
    var sleep = this;
    sleep.data = ApplicationService;
    sleep.isSleeping = ApplicationService.sleep;

    sleep.sleeping = function() {
      ApplicationService.calcStats("sleep", "acted");  
    } 

    ApplicationService.startLoop();

	}

  SleepCtrl.$inject = ["ApplicationService", "$scope"];

})()