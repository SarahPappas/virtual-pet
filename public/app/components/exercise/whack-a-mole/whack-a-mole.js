(function() {
	angular.module("VirtualPetApp")
	.component("whackAMole", {
		templateUrl: "app/components/exercise/whack-a-mole/whack-a-mole.html",
		controller: WhackCtrl,
		controllerAs: "WhackCtrl"
	});

	function WhackCtrl(ApplicationService, $state, $scope) {
		var WhackCtrl = this;
    var yoda = document.getElementsByClassName('moleYoda');
		WhackCtrl.data = ApplicationService;
		document.getElementById("moleYoda1").style.marginTop = '25%';
		document.getElementById("moleYoda2").style.marginTop = '40%';
		document.getElementById("moleYoda3").style.marginTop = '65%';
		WhackCtrl.lastYoda;
		WhackCtrl.score = 0;

    if (ApplicationService.species == "cat") {
      for(i=0; i<yoda.length;i++) {
        yoda[i].src = '/img/pickpet1.png';
      }  
    } else if (ApplicationService.species == "bat") {
      for(i=0; i<yoda.length;i++) {
        yoda[i].src = '/img/pickpet2.png';
      }  
    } else if (ApplicationService.species == "monkey") {
      for(i=0; i<yoda.length;i++) {
        yoda[i].src = '/img/pickpet3.png';
      }  
    } else {
      for(i=0; i<yoda.length;i++) {
        yoda[i].src = '/img/pickpet4.png';
      }  
    }   

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
    })

		WhackCtrl.popUp = function(ApplicationService) {
			var randomNum = Math.floor(Math.random()*3+1);
			if(WhackCtrl.lastYoda === randomNum) {
				WhackCtrl.popUp();
				return;
			}
			else {
				WhackCtrl.lastYoda = randomNum;
				var character = document.getElementById("moleYoda" + randomNum);
				var splitMargin = character.style.marginTop.split('');
				var currentMargin = parseInt(splitMargin[0] + splitMargin[1]);
				character.style.marginTop = currentMargin - 15 + '%';
				setTimeout(function(){character.style.marginTop = currentMargin + '%'}, 1000)
			}
		}

		WhackCtrl.addPoint = function() {
			WhackCtrl.score += 1;
			if(WhackCtrl.score === 5) {
        ApplicationService.calcStats("exercise", "acted"); 
				setTimeout(function() {
					$state.go('backPlay');
				}, 2000);
			}
		}

		setInterval(function(){ WhackCtrl.popUp() }, 3000);

		ApplicationService.startLoop();
	}

		WhackCtrl.$inject = ["ApplicationService", '$state', '$scope'];

})()