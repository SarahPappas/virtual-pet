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

        ApplicationService.startLoop();
        // <--------- remove above, update function below that runs on click -------->

        feed.feeding = function() {
            // getstats,then calcstats, then save stats
            ApplicationService.calcStats("feed", "acted");
            // ApplicationService.saveStats("feed", Date.now(), ApplicationService.mood, ApplicationService.health);
        }

    }

    Feed.$inject = ["ApplicationService", "$scope"];

})()