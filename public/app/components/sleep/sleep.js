(function() {
	angular.module("VirtualPetApp")
	.component("sleep", {
		templateUrl: "app/components/sleep/sleep.html",
		controller: SleepCtrl,
		controllerAs: "sleep"
	});

	function SleepCtrl() {
    console.log('sleep cycle awakened')
    var sleep = this;
    sleep.sleeping = false;
    var currentDate = Date.now();

    sleep.petSleeping = function() {
      sleep.sleeping = !sleep.sleeping;
      if(currentDate > (ApplicationService.pet.feed.last + 72000000)) {
        ApplicationService.minusHealth()
      }
    } 

	}

})()