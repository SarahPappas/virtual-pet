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
    // sleep.isSleeping = ApplicationService.sleep;
    sleep.shouldSleep = false;

    $scope.safeApply = function(fn) {
      var phase = this.$root.$$phase;
      if(phase == '$apply' || phase == '$digest') {
        if(fn && (typeof(fn) === 'function')) {
          fn();
        }
      } else {
        this.$apply(fn);
      }
    };

    $scope.$on("update", function(event, args) {
      $scope.safeApply();

      // var el = document.getElementById("nav-sleep");
      
      // SLEEP TIMEOUT
      if(!ApplicationService.sleep){ 

        if(Date.now() > (Number(ApplicationService.stats[0].last) + (ApplicationService.actionInfos.sleep.msUntilMissed / 2)))
        {
          sleep.shouldSleep =  true;
        } else {
          sleep.shouldSleep =  false;
        }
        // ALERT
        var el = document.getElementById("nav-sleep");
        if (Date.now() > (Number(ApplicationService.stats[0].last) + (ApplicationService.actionInfos.sleep.msUntilMissed / 1.15))) {
          el.className ="nav nav-sleep-alert";
        } else {
          el.className ="nav nav-sleep";
        }
      }

    })


    sleep.sleeping = function() {
      ApplicationService.calcStats("sleep", "acted");
      sleep.changeElement();
      sleep.shouldSleep = false;  
    }

    sleep.changeElement = function() {
      var el = document.getElementById("default-anim");
      if (ApplicationService.species == "cat") {
        el.className ="c1-sleep-anim";
      } else if (ApplicationService.species == "bat") {
        el.className ="c2-sleep-anim";
      } else if (ApplicationService.species == "monkey") {
        el.className ="c4-sleep-anim";
      } else {
        el.className ="c3-sleep-anim";
      }

      $timeout(function() {
      if (ApplicationService.species == "cat") {
        el.className ="c1-default-anim";
      } else if (ApplicationService.species == "bat") {
        el.className ="c2-default-anim";
      } else if (ApplicationService.species == "monkey") {
        el.className ="c4-default-anim";
      } else {
        el.className ="c3-default-anim";
      }

      }, ApplicationService.actionInfos.sleep.msSleeping + 1000);
    }



    ApplicationService.startLoop();

	}

  SleepCtrl.$inject = ["ApplicationService", "$scope", "$timeout"];

})()