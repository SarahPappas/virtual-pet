(function() {
	angular.module("VirtualPetApp")
	.component("clean", {
		templateUrl: "app/components/clean/clean.html",
		controller: Clean,
		controllerAs: "clean"
	});

	function Clean(ApplicationService) {
		ApplicationService.startLoop();
	}
	
	Clean.$inject = ["ApplicationService"];
})()