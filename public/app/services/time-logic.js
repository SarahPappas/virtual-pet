var APPLY;
angular.module("VirtualPetApp")
.service("ApplicationService", ["$http", "$rootScope", function($http, $rootScope) {
  this.stats = {};  
  
  // this.mood = 100;
  // this.health = 100;
  this.sleep = false;
  this.msPerHour = 1000 * 60 * 60;

  // constants
  this.actionInfos = {
      sleep: {
        msUntilMissed: 140000,
        // 10 * this.msPerHour
        msSleeping: 100000,
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
          msUntilMissed: 10000,
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
        // msUntilNeeded: 4 * this.msPerHour,
        msUntilMissed: 100000,
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
      exercise: {
        // msUntilNeeded: 4 * this.msPerHour,
        msUntilMissed: 50000,
        // msUntilMissed: 5 * this.msPerHour,
        moodDeltas: {
            missed: -20,
            acted: 10,
        },
        healthDeltas: {
            missed: 0,
            acted: 0,
        }
      },
      nurse: {
        // msUntilNeeded: 4 * this.msPerHour,
        msUntilMissed: 6000,
        // msUntilMissed: 5 * this.msPerHour,
        moodDeltas: {
            missed: 0,
            acted: 0,
        },
        healthDeltas: {
            missed: 0,
            acted: 70,
        }
      }
  }
  
  this.getStats = function() {
      return $http({
          url: "/api/users/stats",
          method: "GET"
      })
      .then(function(res) {
        if(!res) {
          console.log("front-end error when getting Stats");
        } else {
          return res;
        }
      });
  }.bind(this);

  this.saveStats = function(activity, lastDate, mood, health) {
      // finish put route for stats

      if (health === undefined) {
        health = null;
      }

      if (mood === undefined) {
        mood = null;
      }

      return $http({
        url: "/api/users/stats",
        method: "PUT",
        data: {
          activity: activity || null,
          lastTime: lastDate || null,
          mood: mood,
          health: health
        }
      });
  };

  this.calcStats = function(activity, actedOrMissed) {
    var index = 0;
    if (activity == "sleep") {
      var index = 0;
    }
    if (activity == "feed") {
      var index = 1;
    }
    if (activity == "clean") {
      var index = 2;
    }
    if (activity == "exercise") {
      var index = 3;
    }
    if (activity == "nurse") {
      var index = 4;
    }

    var now = Date.now();
    // set action to passed action
    var actionInfo = this.actionInfos[activity];
    // seting time untill missed
    var msUntilMissed = actionInfo.msUntilMissed;

    var totalTime = Number(this.stats[index].last) + msUntilMissed;
    // setting delta
    var delta = actionInfo.moodDeltas.missed;
    // using actedOrMissed to set equal to missed
    
    if (this.isSleeping) {
      totalTime += this.actionInfos.sleep.msSleeping;
      console.log("sleep");
    }
    console.log("savedTime",Number(this.stats[1].last))
    console.log("now", now);
    console.log("totalTime", totalTime);
    console.log("countDown", totalTime - now);

    var isTimeExpired = false;
    if (now > totalTime) {
      isTimeExpired = true;
    }

    this.applyUpdates(activity, actedOrMissed, isTimeExpired);
  }

  this.applyUpdates = function(activity, actedOrMissed, isTimeExpired) {
    var actionInfo = this.actionInfos[activity];

    if(!isTimeExpired && actedOrMissed == "acted" ) {
      console.log("acted");
      var delta = actionInfo.moodDeltas.acted;
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
      this.saveStats(activity, Date.now(), this.mood, this.health)
        .then(function(res) {
              this.stats = res.data.pet.stats;
              this.mood = res.data.pet.mood;
              this.health = res.data.pet.health;
              this.sleep = res.data.pet.sleap;
        }.bind(this));
      $rootScope.$broadcast("update", this); 
    }
    
    if (isTimeExpired) {
      var delta = actionInfo.moodDeltas.missed;
      console.log("now is passed totalTime");
      if(this.mood + delta < 0){
        this.mood = 0;
      } else if (this.mood + delta >= 100) {
        this.mood = 100;
      } else {
        this.mood += delta;
      }
      if(this.health + delta < 0){
        this.health = 0;
      } else if (this.health + delta >= 100) {
        this.health = 100;
      } else {
        this.health += delta;
      }
      console.log("saving stats:", this.mood, this.health);
      this.saveStats(activity, Date.now(), this.mood, this.health)
      .then(function() {
        console.log("getting stats");
        this.getStats().then(function(res) {
          console.log("   got stats:", res.data.pet.mood, res.data.pet.health);
          this.stats = res.data.pet.stats;
          this.mood = res.data.pet.mood;
          this.health = res.data.pet.health;
          this.sleep = res.data.pet.sleap;
        }.bind(this))
      }.bind(this));
      $rootScope.$broadcast("update", this);
    }
  }.bind(this);


  this.checkForUpdate = function() {
    console.log("gamelooped");
    this.getStats()
      .then(function(res) {
        this.stats = res.data.pet.stats;
        this.mood = res.data.pet.mood;
        this.health = res.data.pet.health;
        this.sleep = res.data.pet.sleap;
      }.bind(this))
      .then(function() {
        // for (var i = 0; i < this.stats.length; i++) {
          console.log(this.stats[1].name);
          this.calcStats(this.stats[1].name, "missed");
        // }
      }.bind(this));
      // .then(function() {
      //   for (var i = 0; i < this.stats.length; i++) {
      //     this.saveStats(this.stats[i].name, Date.now(), this.mood, this.health);
      //   }
      // });
  }.bind(this);

  this.onLogin = function() {
    this.getStats()
      .then(function(res) {
        this.stats = res.data.pet.stats;
        this.mood = res.data.pet.mood;
        this.health = res.data.pet.health;
        this.sleep = res.data.pet.sleep;
      }.bind(this))
      .then(function() {
        for (var i = 0; i < this.stats.length; i++) {
          this.calcStats(this.stats[i].name, "missed");
          console.log("onLogin", this.stats[i].name);
        }
      }.bind(this));
  }.bind(this);
    
  setInterval(this.checkForUpdate, 3000);  
  APPLY = this.applyUpdates;
}]);