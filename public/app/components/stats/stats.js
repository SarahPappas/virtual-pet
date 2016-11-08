(function() {
	angular.module("VirtualPetApp")
	.component("stats", {
		templateUrl: "app/components/stats/stats.html",
		controller: StatsCtrl,
		controllerAs: "stats"
	});

	function StatsCtrl(TimeLogicService) {
    var health = 100;
    var mood = 100;
    var currentDate = Date.now()
    var rateOfChangeMood = 

    function totalMood(playVar, feedVar) {
      if (mood <= 0) {
        health -= 25;
      }
      else if(currentDate > TimeLogicService.pet.feed.next) {
        mood -= 25;
        if (currentDate < TimeLogicService.pet.exercise.next)
      }
      else if(currentDate > TimeLogicService.pet.exercise.next) {
        mood -= 25;
      }

    }

    function totalHealth(TimeLogicService) {
      if(currentDate > TimeLogicService.pet.sleep.next) {
        health -= 25;
      }
      else if(currentDate > TimeLogicService.pet.clean.next) {
        health -=25;
      }
      else if () {}
    }

	}
StatsCtrl.$inject = ['TimeLogicService']
})()

