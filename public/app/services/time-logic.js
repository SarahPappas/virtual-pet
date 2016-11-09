angular.module("VirtualPetApp")
.service("ApplicationService", ["$http", "$rootScope", function($http, $rootScope) {
  this.data = {};  
  
  this.mood = 100;
  this.health = 100;
  this.msPerHour = 1000 * 60 * 60;

  // constants
  this.actionInfos = {
      sleep: {
        msUntilMissed: 6000,
        // 10 * this.msPerHour
        msSleeping: 10000,
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
          url: "/api/users/stats",
          method: "GET"
      })
      .then(function(res) {
        if(!res) {
          
        } else {
          
        }
      });
  };


  this.saveStats = function(activity, lastDate, mood, health) {
      // finish put route for stats
      return $http({
        url: "/api/users/stats",
        method: "PUT",
        data: {
          activity: activity || null,
          lastTime: lastDate || null,
          mood: mood || null,
          health: health || null
        }
      });
  };

  this.saveStats("feed", Date.now(), null, null);

  this.calcStatsOnClick = function(currentActivity){
    this.calcStats(currentActivity);
  }.bind(this);



  this.calcStats = function(activity, actedOrMissed) {

    var now = Date.now();
    
    // set action to passed action
    var actionInfo = this.actionInfos[activity];
    // seting time untill missed
    var msUntilMissed = actionInfo.msUntilMissed;
    var totalTime = this.timeLastExecuted + msUntilMissed;
    // setting delta
    var delta = actionInfo.moodDeltas.missed;
    // using actedOrMissed to set equal to missed
    if( actedOrMissed == "missed" ) {
      var delta = actionInfo.moodDeltas.missed;
    } else {
      var delta = actionInfo.moodDeltas.acted;
    }
    
    if (this.isSleeping) {
      totalTime += this.actionInfos.sleep.msSleeping;
    }

    if (now > totalTime) {
      if(this.mood + delta < 0){
        this.mood = 0;
      } else if (this.mood + delta >= 100) {
        this.mood = 100;
      } else {
        this.mood += delta;
      }
      if(this.health + delta < 0){
        this.health = 0
      } else if (this.health + delta >= 100) {
        this.health = 100;
      } else {
        this.health += delta;
      }
      $rootScope.$broadcast("update", this);
    }
  }.bind(this);


  this.checkForUpdate = function() {
    // get function
    // this.getStats();


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


  // login function to be moved to proper controller
  this.onLogin = function() {
    // get data
    // calc data
    // set new base dates
  }

  // game loop, where should this be called?
  setInterval(this.checkForUpdate, 3000);

}]);