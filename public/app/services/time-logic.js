angular.module("VirtualPetApp")
.service("ApplicationService", ["$http", "$rootScope", function($http, $rootScope) {
  this.data = {
    health: 100,
    mood: 100,
    stats: {
      activity: "feed",
      timeExecuted: Date.now()
    }
  }  
  

  this.msPerHour = 1000 * 60 * 60;

  this.timeLastExecuted = Date.now();
  // constants
  this.actionInfos = {
      sleep: {
        msUntilMissed: 6000,
        // msUntilMissed: 5 * this.msPerHour,
        moodDeltas: {
            missed: 0,
            acted: 0,
        },
        healthDeltas: {
            missed: -20,
            acted: 10,
        }
      },
      feed: {
          // msUntilNeeded: 4 * this.msPerHour,
          msUntilMissed: 6000,
          // msUntilMissed: 5 * this.msPerHour,
          moodDeltas: {
              missed: -20,
              acted: 10,
          },
          healthDeltas: {
              missed: -20,
              acted: 10,
          }
      },
      clean: {
      },
      exercise: {
      },
      nurse: {
      }
  }

  // call onlogin, setTimeouts
  // gets all stats
  this.getStats = function() {
      return $http({
          url: "/api/users",
          method: "GET"
      }).then(function(res) {
          return res.data;
      });
  };

  this.saveStats = function(activity, lastDate, mood, health) {
      // finish put route for stats
      return $http({
        url: "/api/users/stats",
        method: "PUT",
        data: {
          activity: activity,
          lastTime: lastDate,
          mood: mood,
          health: health
        }
      });
  };

  this.calcStatsOnClick = function(currentActivity){
    this.calcStats(currentActivity);
  }.bind(this);



  this.calcStats = function(activity, actedOrMissed) {

      var now = Date.now();
      console.log(activity);
      console.log(this.actionInfos[activity]);
      // set action to passed action
      var actionInfo = this.actionInfos[activity];
      // seting time untill missed
      var msUntilMissed = actionInfo.msUntilMissed;
      // setting delta
      var delta = actionInfo.moodDeltas.missed;
      // using actedOrMissed to set equal to missed
      if( actedOrMissed == "missed" ) {
        var delta = actionInfo.moodDeltas.missed;
      } else {
        var delta = actionInfo.moodDeltas.acted;
      }

        if(now > this.timeLastExecuted + msUntilMissed) {
            if(this.mood + delta < 0){
                this.mood = 0;
            } else {
                this.mood += delta;
            }
            if(this.health + delta < 0){
                this.health = 0
            } else {
                this.health += delta;
            }
            $rootScope.$broadcast("update", this);
        }
  }.bind(this);


  this.checkForUpdate = function() {
          console.log("fire");
          //loop?
          this.calcStats("feed", "missed");

      // this.getStats()
      //     .then(function(stats) {
      //         this.calcStats(stats.activity);
      //     }.bind(this));



      // get stats from db
      // do calculations
      // if change broadcast and change inside db
  }.bind(this);

  // game loop, where should this be called?
  setInterval(this.checkForUpdate, 3000);

  this.mood = 100;
  this.health = 100;
}]);


//     function StatsCtrl(ApplicationService) {
//     var health = 100;
//     var mood = 100;
//     var currentDate = Date.now();
   
//     function totalMood(playVar, feedVar) {
//       ApplicationService.getStats();
//       if (mood <= 0) {
//         health -= 25;
//       }
//       else if(currentDate > ApplicationService.pet.feed.next) {
//         mood -= 25;
//       }
//       }
//       else if(currentDate > ApplicationService.pet.exercise.next) {
//         mood -= 25;
//       }
//       return $http({
//         method: 'PUT',
//         url: '/api/users/stats',
//         data: {mood: mood}
//       });    
//     }
//     function totalHealth(ApplicationService) {
//       ApplicationService.getStats()
//       if(currentDate > ApplicationService.pet.sleep.next) {
//         health -= 25;
//       }
//       else if(currentDate > ApplicationService.pet.clean.next) {
//         health -= 25;
//       }
//       else if(currentDate > ApplicationService.pet.feed.next) {
//         health -= 25;
//       }
//       return $http({
//         method: 'PUT',
//         url: '/api/users/stats',
//         data: {health: health}
//       });    
//     }
//     }
// StatsCtrl.$inject = ['ApplicationService'];
// })()