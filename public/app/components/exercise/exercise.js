(function() {
	angular.module("VirtualPetApp")
	.component("exercise", {
		templateUrl: "app/components/exercise/exercise.html",
		controller: Exercise,
		controllerAs: "exercise"
	});

	function Exercise(ApplicationService) {
		ApplicationService.startLoop();
	}

	Exercise.$inject = ["ApplicationService"];
})()