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

        $scope.safeApply = function(fn) {
          var phase = this.$root.$$phase;
          if(phase == '$apply' || phase == '$digest') {
            if(fn && (typeof(fn) === 'function')) {
              fn();
            }
          } else {
            this.$apply(fn);
          }
        };



        $scope.$on("update", function(event, args) {
            $scope.safeApply();
        })
        // <--------- remove above, update function below that runs on click -------->

        ApplicationService.getStats()
            .then(function(res) {
                // console.log("res", res);
            });

        feed.feeding = function() {
            // getstats,then calcstats, then save stats
            ApplicationService.calcStats("feed", "acted");
            // ApplicationService.saveStats("feed", Date.now(), ApplicationService.mood, ApplicationService.health);
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