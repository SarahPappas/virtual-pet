(function() {
    angular.module("VirtualPetApp")
    .component("feed", {
        templateUrl: "app/components/feed/feed.html",
        controller: Feed,
        controllerAs: "feed"
    });

    function Feed(ApplicationService, $scope) {
        var feed = this;

        // <-------- the only thing the feed needs to do is update server on click ------->
        feed.data = ApplicationService;


        $scope.$on("update", function(event, args) {
            console.log("caught braodcast");
            console.log("args", args);
            console.log("feed", feed.data)
            $scope.$apply();
        })
        // <--------- remove above, update function below that runs on click -------->

        ApplicationService.getStats()
            .then(function(res) {
                console.log("this ran");
                console.log("res", res);
            });

        feed.feeding = function() {
            ApplicationService.calcStatsOnClick("feed", "acted");
        }

        // //function to run on click
        // feed.feeding = function () {
        //     // update database,
        //     var msUntilNeeded = ApplicationService.actionInfos.feed.msUntilNeeded;
        //     ApplicationService.saveStats("feed", date.now());
        //     //exectue game loop and game loop will braodcast if changes?
        // };

    }

    Feed.$inject = ["ApplicationService", "$scope"];

})()