(function() {
	angular.module("VirtualPetApp")
	.component("nurse", {
		templateUrl: "app/components/nurse/nurse.html",
		controller: Nurse,
		controllerAs: "nurse"
	});

	function Nurse(ApplicationService) {
		ApplicationService.startLoop();
	}
	Nurse.$inject = ["ApplicationService"];
})()