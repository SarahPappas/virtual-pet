(function() {
	angular.module("VirtualPetApp")
	.component("sleep", {
		templateUrl: "app/components/sleep/sleep.html",
		controller: SleepCtrl,
		controllerAs: "sleep"
	});

	function SleepCtrl(ApplicationService, $scope, $timeout) {
    console.log('sleep cycle awakened')
    var sleep = this;
    sleep.data = ApplicationService;
    sleep.isSleeping = ApplicationService.sleep;

    sleep.sleeping = function() {
      ApplicationService.calcStats("sleep", "acted");
      sleep.changeElement();  
    }
    sleep.changeElement = function() {
      var el = document.getElementById("default-anim");
      if (ApplicationService.species == "cat") {
        el.className ="c1-sleep-anim";
      } else if (ApplicationService.species == "bat") {
        el.className ="c2-sleep-anim";
      } else if (ApplicationService.species == "monkey") {
        el.className ="c3-sleep-anim";
      } else {
        el.className ="c4-sleep-anim";
      }
    }        

    ApplicationService.startLoop();

	}

  SleepCtrl.$inject = ["ApplicationService", "$scope", "$timeout"];

})()