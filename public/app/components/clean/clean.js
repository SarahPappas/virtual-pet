(function() {
	angular.module("VirtualPetApp")
	.component("clean", {
		templateUrl: "app/components/clean/clean.html",
		controller: Clean,
		controllerAs: "clean"
	});

	function Clean(ApplicationService, $scope, $timeout) {
		var clean = this;
    clean.hasPooped = 'false';
    clean.isCleanAllowed = false;
		clean.data = ApplicationService;

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
      console.log(clean.data.stats[2]);
      if (Date.now()-clean.data.stats[2].last > 30000) {
        clean.hasPooped = 'true';
        $http({
          url: "/api/users/newPet",
          method: "PUT",
          data: clean.hasPooped
        }).then(function(res){
          ApplicationService.onLogin();
        });
      }
      console.log("has pooped: " + clean.hasPooped);

      if(Date.now() > (Number(ApplicationService.stats[2].last) + (ApplicationService.actionInfos.clean.msUntilMissed / 1.5)))
      {
        clean.isCleanAllowed =  true;
      } else {
        clean.isCleanAllowed =  false;
      }

      // ALERT
      if (clean.isCleanAllowed) {
        var el = document.getElementById("nav-clean");
        el.className ="nav nav-clean-alert";
      } else {
        var el = document.getElementById("nav-clean");
        el.className ="nav nav-clean";
      }
    })

    clean.cleaning = function() {
    	ApplicationService.calcStats("clean", "acted");
      clean.hasPooped = 'false';
      $http({
          url: "/api/users/newPet",
          method: "PUT",
          data: clean.hasPooped
      }).then(function(res){
          console.log("poop has been cleaned!");
      });
    	clean.changeElement();
    }

    clean.changeElement = function() {
      var el = document.getElementById("default-anim");
      el.className ="cleanbar";

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
      }, 1000);
    };

		ApplicationService.startLoop();
	}
	
	Clean.$inject = ["ApplicationService", "$scope", "$timeout"];
})()