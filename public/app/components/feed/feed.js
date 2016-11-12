(function() {
    angular.module("VirtualPetApp")
    .component("feed", {
        templateUrl: "app/components/feed/feed.html",
        controller: Feed,
        controllerAs: "feed"
    });

    function Feed(ApplicationService, $scope, $timeout) {
        ApplicationService.startLoop();
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

        feed.feeding = function() {
            ApplicationService.calcStats("feed", "acted");
            feed.changeElement();

        }

        feed.changeElement = function() {
          var el = document.getElementById("default-anim");
          if (ApplicationService.species == "cat") {
            el.className ="c1-feed-anim";
          } else if (ApplicationService.species == "bat") {
            el.className ="c2-feed-anim";
          } else if (ApplicationService.species == "monkey") {
            el.className ="c4-feed-anim";
          } else {
            el.className ="c3-feed-anim";
          }

          $timeout(function() {
            if (ApplicationService.species == "cat") {
              el.className ="c1-default-anim";
            } else if (ApplicationService.species == "bat") {
              el.className ="c2-default-anim";
            } else if (ApplicationService.species == "monkey") {
              el.className ="c4-default-anim";
            } else {
              el.className ="c3-default-anim";
            }
          }, 4000);
        }

    }

    Feed.$inject = ["ApplicationService", "$scope", "$timeout"];

})()