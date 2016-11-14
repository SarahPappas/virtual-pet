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
        feed.isFeedAllowed = true;

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
            // FEED TIMEOUT
            if(Date.now() > (Number(ApplicationService.stats[1].last) + (ApplicationService.actionInfos.feed.msUntilMissed / 2)))
            {
              feed.isFeedAllowed =  true;
            } else {
              feed.isFeedAllowed =  false;
            }

            // ALERT
            if (Date.now() > (Number(ApplicationService.stats[1].last) + (ApplicationService.actionInfos.feed.msUntilMissed / 1.2))){
              var el = document.getElementById("nav-feed");
              el.className ="nav nav-feed-alert";
            } else {
              var el = document.getElementById("nav-feed");
              el.className ="nav nav-feed";
            }
        })



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
          }, 8000);
        }



    }

    Feed.$inject = ["ApplicationService", "$scope", "$timeout"];

})()