(function() {
	angular.module("VirtualPetApp")
	.component("exercise", {
		templateUrl: "app/components/exercise/exercise.html",
		controller: ExerciseCtrl,
		controllerAs: "ExerciseCtrl"
	});

	function ExerciseCtrl(ApplicationService, $scope) {
		var exerciseCtrl = this;
		exerciseCtrl.playingWhack = false;
		exerciseCtrl.playingGuess = false;
		exerciseCtrl.playingDodge = false;
		exerciseCtrl.bePLayin = false;
		exerciseCtrl.shouldPlay = false;

			exerciseCtrl.playWhack = function() {
				exerciseCtrl.playingWhack = true;
				exerciseCtrl.bePLayin = true;
				exerciseCtrl.playing();
				document.getElementById("default-anim").style.display = "none";

			};

			exerciseCtrl.playGuess = function() {
				exerciseCtrl.playingGuess = true;
				exerciseCtrl.bePLayin = true;
				exerciseCtrl.playing();
				document.getElementById("default-anim").style.display = "none";
			};

			exerciseCtrl.playDodge = function() {
				exerciseCtrl.playingDodge = true;
				exerciseCtrl.bePLayin = true;
				exerciseCtrl.playing();
				document.getElementById("default-anim").style.display = "none";
			}

			exerciseCtrl.playing = function() {
			    ApplicationService.calcStats("exercise", "acted");
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
			    // FEED TIMEOUT
			    if(Date.now() > (Number(ApplicationService.stats[3].last) + (ApplicationService.actionInfos.exercise.msUntilMissed / 1.5)))
			    {
			      exerciseCtrl.shouldPlay =  true;
			    } else {
			      exerciseCtrl.shouldPlay =  false;
			    }

			    // ALERT
			    if (exerciseCtrl.shouldPlay) {
			      var el = document.getElementById("nav-game");
			      el.className ="nav nav-game-alert";
			    } else {
			      var el = document.getElementById("nav-game");
			      el.className ="nav nav-game";
			    }
			})



			ApplicationService.startLoop();
	}

	ExerciseCtrl.$inject = ["ApplicationService", "$scope"];
})()