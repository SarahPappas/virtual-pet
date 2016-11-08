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
    var currentDate = Date.now();
    var foodMaxUp = 0;
    var foodMoodUp = 0;
    var sleepMaxUp = 0;
    var playMaxUp = 0;
    var cleanMaxUp = 0;

    function totalMood(playVar, feedVar) {
      foodMoodUp = Math.floor((currentDate - TimeLogicService.pet.feed.last) / 4) * 25
      playMaxUp= Math.floor((currentDate - TimeLogicService.pet.exercise.last) / 4) * 25

      TimeLogicService.getStats();

      if (mood <= 0) {
        health -= 25;
      }
      else if(currentDate > TimeLogicService.pet.feed.next) {
        mood -= 25;
      }
      else if(foodMoodUp > 0){
        mood += 12.5;
        foodMoodUp -= 12.5;
      }
      else if(currentDate > TimeLogicService.pet.exercise.next) {
        mood -= 25;
      }
      else if(playMaxUp > 0){
          mood += 25;
          playMaxUp -= 25;
        }
      return $http({
        method: 'PUT',
        url: '/api/users/stats',
        data: {mood: mood}
      });    
    }

    function totalHealth(TimeLogicService) {
      foodMaxUp = Math.floor((currentDate - TimeLogicService.pet.feed.last) / 4) * 25
      sleepMaxUp = Math.floor((currentDate - TimeLogicService.pet.sleep.last) / 4) * 25
      cleanMaxUp = Math.floor((currentDate - TimeLogicService.pet.clean.last) / 4) * 25

      TimeLogicService.getStats()

      if(currentDate > TimeLogicService.pet.sleep.next) {
        health -= 25;
      }
      else if(sleepMaxUp > 0) {
        health += 12.5;
        sleepMaxUp += 12.5;
      }
      else if(currentDate > TimeLogicService.pet.clean.next) {
        health -= 25;
      }
      else if(cleanMaxUp > 0) {
        health += 12.5;
        cleanMaxUp += 12.5;
      }
      else if(currentDate > TimeLogicService.pet.feed.next) {
        health -= 25;
      }
      else if(foodMaxUp > 0){
        mood += 12.5;
        foodMaxUp -= 12.5;
      }
      return $http({
        method: 'PUT',
        url: '/api/users/stats',
        data: {health: health}
      });    
    }

	}
StatsCtrl.$inject = ['TimeLogicService'];
})()

