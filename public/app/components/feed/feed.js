(function() {
	angular.module("VirtualPetApp")
	.component("feed", {
		templateUrl: "app/components/feed/feed.html",
		controller: Feed,
		controllerAs: "feed"
	});

	function Feed() {
		
	}

})()