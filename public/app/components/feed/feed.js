(function() {
    angular.module("VirtualPetApp")
    .component("feed", {
        templateUrl: "app/components/feed/feed.html",
        controller: Feed,
        controllerAs: "feed"
    });

    function Feed(ApplicationService, $scope) {
        var feed = this;
        feed.stats = {};
        feed.data = ApplicationService;

        $scope.$on("update", function(event, args) {
            console.log("caught braodcast");
            console.log("args", args);
            feed.data = args;
            console.log("feed", feed.data)
            $scope.$apply();
        })


        ApplicationService.getStats()
            .then(function() {
                //this path may need to change
                data.pet.stats.feed = feed.stats
            });

        //function to run on click
        feed.feeding = function () {
            // update database,
            var msUntilNeeded = ApplicationService.actionInfos.feed.msUntilNeeded;
            ApplicationService.saveStats("feed", date.now());
            //exectue game loop and game loop will braodcast if changes?
        };

    }

    Feed.$inject = ["ApplicationService", "$scope"];

})()