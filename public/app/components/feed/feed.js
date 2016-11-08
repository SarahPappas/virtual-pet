(function() {
	angular.module("VirtualPetApp")
	.component("feed", {
		templateUrl: "app/components/feed/feed.html",
		controller: Feed,
		controllerAs: "feed"
	});

	function Feed(TimeLogicService) {
		var feed = this;
		feed.stats = {};
		feed.timeTillNextMeal = TimeLogicService.actionBy.feed.hours * TimeLogicService.millisecondHr;

		TimeLogicService.getStats()
			.then(function() {
				//this path may need to change
				data.pet.stats.feed = feed.stats
			});

		//function to run on click
		feed.feeding = function () {
			// update database,
			TimeLogicService.saveStats("feed", date.now(), date.now() + feed.timeTillNextMeal);
			//exectue game loop and game loop will braodcast if changes?
		};

	}

	Feed.$inject = ["TimeLogicService"]

})()