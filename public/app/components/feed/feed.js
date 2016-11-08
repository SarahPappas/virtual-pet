(function() {
    angular.module("VirtualPetApp")
    .component("feed", {
        templateUrl: "app/components/feed/feed.html",
        controller: Feed,
        controllerAs: "feed"
    });

    function Feed(ApplicationService) {
        var feed = this;
        feed.stats = {};
        feed.data = ApplicationService;

        ApplicationService.getStats()
            .then(function() {
                //this path may need to change
                data.pet.stats.feed = feed.stats
            });

        //function to run on click
        feed.feeding = function () {
            // update database,
            var msUntilNeeded = ApplicationService.actionInfos.feed.msUntilNeeded;
            ApplicationService.saveStats("feed", date.now(), date.now() + msUntilNeeded);
            //exectue game loop and game loop will braodcast if changes?
        };

    }

    Feed.$inject = ["ApplicationService"];

})()