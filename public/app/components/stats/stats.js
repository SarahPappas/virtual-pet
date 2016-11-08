(function() {
	angular.module("VirtualPetApp")
	.component("stats", {
		templateUrl: "app/components/stats/stats.html",
		controller: StatsCtrl,
		controllerAs: "stats"
	});

	function StatsCtrl(ApplicationService) {
    var health = 100;
    var mood = 100;
    var currentDate = Date.now();
   

    function totalMood(playVar, feedVar) {

      ApplicationService.getStats();

      if (mood <= 0) {
        health -= 25;
      }
      else if(currentDate > ApplicationService.pet.feed.next) {
        mood -= 25;
      }
      else if(foodMoodUp > 0){
        mood += 12.5;
        foodMoodUp -= 12.5;
      }
      else if(currentDate > ApplicationService.pet.exercise.next) {
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

    function totalHealth(ApplicationService) {
      foodMaxUp = Math.floor((currentDate - ApplicationService.pet.feed.last) / 4) * 25
      sleepMaxUp = Math.floor((currentDate - ApplicationService.pet.sleep.last) / 4) * 25
      cleanMaxUp = Math.floor((currentDate - ApplicationService.pet.clean.last) / 4) * 25

      ApplicationService.getStats()

      if(currentDate > ApplicationService.pet.sleep.next) {
        health -= 25;
      }
      else if(sleepMaxUp > 0) {
        health += 12.5;
        sleepMaxUp += 12.5;
      }
      else if(currentDate > ApplicationService.pet.clean.next) {
        health -= 25;
      }
      else if(cleanMaxUp > 0) {
        health += 12.5;
        cleanMaxUp += 12.5;
      }
      else if(currentDate > ApplicationService.pet.feed.next) {
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
StatsCtrl.$inject = ['ApplicationService'];
})()

