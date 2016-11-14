angular.module("VirtualPetApp")
.service("ApplicationService", ["$http", "$rootScope", function($http, $rootScope) {
  this.gameLoopInterval = null;
  this.stats = {};  
  this.msPerHour = 1000 * 60 * 60;

  // constants
  this.actionInfos = {
      sleep: {
        msUntilMissed: 1000000,
        // 10 * this.msPerHour
        msSleeping: 60000,
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
          msUntilMissed: 30000,
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
        msUntilMissed: 30000,
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
        msUntilMissed: 60000,
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
        msUntilMissed: 24 * this.msPerHour,
        // msUntilMissed: 5 * this.msPerHour,
        msUntilAvailable: 30000,
        moodDeltas: {
            missed: 0,
            acted: 0,
        },
        healthDeltas: {
            missed: 0,
            acted: 100,
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

  this.saveStats = function(activity, lastDate, mood, health, sleep) {
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
          health: health,
          sleep: sleep
        }
      });
  };

  this.calcStats = function(activity, actedOrMissed, login) {
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
    // using actedOrMissed to set equal to missed
    
    if (this.sleep) {
      totalTime += this.actionInfos.sleep.msSleeping;
      document.getElementById('left-nav').style.visibility = "hidden"
      document.getElementById('right-nav').style.visibility = "hidden"
        var el = document.getElementById("default-anim");
        if (this.species == "cat") {
          el.className ="c1-sleep-anim";
        } else if (this.species == "bat") {
          el.className ="c2-sleep-anim";
        } else if (this.species == "monkey") {
          el.className ="c4-sleep-anim";
        } else {
          el.className ="c3-sleep-anim";
        }   
    }
    else {
      document.getElementById('left-nav').style.visibility = "visible";
      document.getElementById('right-nav').style.visibility = "visible";
    }  
    // console.log("savedTime",Number(this.stats[1].last))
    // console.log("now", now);
    // console.log("totalTime", totalTime);
    // console.log("countDown", totalTime - now);

    var isTimeExpired = false;
    if (now > totalTime) {
      isTimeExpired = true;
    }

    var lastTime = this.stats[index].last; 

    this.applyUpdates(activity, actedOrMissed, isTimeExpired, lastTime, login);

  }.bind(this)

  this.applyUpdates = function(activity, actedOrMissed, isTimeExpired, lastTime, login) {
    var actionInfo = this.actionInfos[activity];
    var now = Date.now();

    if(!isTimeExpired && actedOrMissed == "acted" ) {
      var deltaMood = actionInfo.moodDeltas.acted;
      var deltaHealth = actionInfo.healthDeltas.acted;
      if (login) {
        var deltaMood = Math.floor((now - lastTime)/actionInfo.moodDeltas.acted);
        var deltaHealth = Math.floor((now - lastTime)/actionInfo.healthDeltas.acted);
      } else {
        var delta = actionInfo.moodDeltas.acted;
      }

      if(this.mood + deltaMood < 0){
        this.mood = 0;
      } else if (this.mood + deltaMood >= 100) {
        this.mood = 100;
      } else {
        this.mood += deltaMood;
      }
      if(this.health + deltaHealth < 0){
        this.health = 0
      } else if (this.health + deltaHealth >= 100) {
        this.health = 100;
      } else {
        this.health += deltaHealth;
      }
      if (activity == "sleep") {
        this.sleep = "true";
      }
      this.saveStats(activity, Date.now(), this.mood, this.health, this.sleep)
        .then(function(res) {
              this.stats = res.data.pet.stats;
              this.mood = res.data.pet.mood;
              this.health = res.data.pet.health;
              this.sleep = res.data.pet.stats[0].isSleeping;
              this.species = res.data.pet.species;
        }.bind(this));
      // $rootScope.$broadcast("update", this); 
    }
    
    if (isTimeExpired) {


      var deltaMood = actionInfo.moodDeltas.missed;
      var deltaHealth = actionInfo.healthDeltas.missed;
      if (login) {
        var deltaMood = Math.floor((now - lastTime)/actionInfo.moodDeltas.missed);
        var deltaHealth = Math.floor((now - lastTime)/actionInfo.healthDeltas.missed);
      } else {
        var delta = actionInfo.moodDeltas.missed;;
      }
      console.log("now is passed totalTime", activity);
      if(this.mood + deltaMood < 0){
        this.health -= 10;
        this.mood = 0;
      } else if (this.mood + deltaMood >= 100) {
        this.mood = 100;
      } else {
        this.mood += deltaMood;
      }
      if(this.health + deltaHealth < 0){
        this.health = 0;
      } else if (this.health + deltaHealth >= 100) {
        this.health = 100;
      } else {
        this.health += deltaHealth;
      }
      console.log("saving stats:", this.mood, this.health, this.sleep);
      this.saveStats(activity, Date.now(), this.mood, this.health, this.sleep)
      .then(function() {
        console.log("getting stats");
        this.getStats().then(function(res) {
          console.log("   got stats:", res.data.pet.mood, res.data.pet.health);
          this.stats = res.data.pet.stats;
          this.mood = res.data.pet.mood;
          this.health = res.data.pet.health;
          this.sleep = res.data.pet.stats[0].isSleeping;
          this.species = res.data.pet.species;
        }.bind(this))
      }.bind(this));
      
      
    }

    if (this.sleep && Date.now() > Number(this.stats[0].last) + this.actionInfos.sleep.msSleeping) {
      this.sleep = "false";
      this.saveStats("sleep", Date.now(), this.mood, this.health, this.sleep)
    }

    $rootScope.$broadcast("update", this);
  }.bind(this);


  this.checkForUpdate = function() {
    console.log("gamelooped");
    this.getStats()
      .then(function(res) {
        this.stats = res.data.pet.stats;
        this.mood = res.data.pet.mood;
        this.health = res.data.pet.health;
        this.sleep = res.data.pet.stats[0].isSleeping;
        this.species = res.data.pet.species;
      }.bind(this))
      .then(function() {
        for (var i = 0; i < this.stats.length; i++) {
          this.calcStats(this.stats[i].name, "missed");
        }
      }.bind(this));
  }.bind(this);

  this.setDefaultSpecies = function() {
    var el = document.getElementById("default-anim");
    console.log(this.species);
    if (this.species === "cat") {
        el.className ="c1-default-anim";
    } else if (this.species === "bat") {
        el.className ="c2-default-anim";
    } else if (this.species === "monkey") {
        el.className ="c3-default-anim";
    } else {
        el.className ="c4-default-anim";
    }
  }

  this.onLogin = function() {
    this.getStats()
      .then(function(res) {
        console.log("onlogin health", res.data.pet.health);
        console.log("sleeping?", res.data.pet.stats[0]);
        this.stats = res.data.pet.stats;
        this.mood = res.data.pet.mood;
        this.health = res.data.pet.health;
        this.sleep = res.data.pet.stats[0].isSleeping;
        this.species = res.data.pet.species;
      }.bind(this))
      .then(function() {
        for (var i = 0; i < this.stats.length; i++) {
          this.calcStats(this.stats[i].name, "missed", "login");
        }
      }.bind(this))
      .then(function() {
        console.log(this.species)
        // this.setDefaultSpecies();
        $rootScope.$broadcast("update", this);
        this.startLoop()
      }.bind(this));
  }.bind(this);

  this.startLoop = function() {
    if (!this.gameLoopInteval) {
      this.onLogin();
      this.setDefaultSpecies();
      this.gameLoopInteval = setInterval(this.checkForUpdate, 3000);
    }
    var el = document.getElementById("default-anim");
    console.log("species", this.species);
    if (this.species === "cat") {
        el.className ="c1-default-anim";
    } else if (this.species === "bat") {
        el.className ="c2-default-anim";
    } else if (this.species === "monkey") {
        el.className ="c4-default-anim";
    } else {
        el.className ="c3-default-anim";
    }
  }.bind(this);  
}]);