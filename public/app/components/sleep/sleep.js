(function() {
	angular.module("VirtualPetApp")
	.component("sleep", {
		templateUrl: "app/components/sleep/sleep.html",
		controller: Sleep,
		controllerAs: "sleep"
	});

	function Sleep() {

	}

})()