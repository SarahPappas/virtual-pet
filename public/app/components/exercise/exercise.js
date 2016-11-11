(function() {
	angular.module("VirtualPetApp")
	.component("exercise", {
		templateUrl: "app/components/exercise/exercise.html",
		controller: ExerciseCtrl,
		controllerAs: "ExerciseCtrl"
	});

	function ExerciseCtrl(ApplicationService) {
		var exerciseCtrl = this;
		exerciseCtrl.playingWhack = false;
		exerciseCtrl.playingGuess = false;
		exerciseCtrl.bePLayin = false;

			exerciseCtrl.playWhack = function() {
				exerciseCtrl.playingWhack = true;
				exerciseCtrl.bePLayin = true;
			};

			exerciseCtrl.playGuess = function() {
				exerciseCtrl.playingGuess = true;
				exerciseCtrl.bePLayin = true;
			};

			ApplicationService.startLoop();
	}

	ExerciseCtrl.$inject = ["ApplicationService"];
})()