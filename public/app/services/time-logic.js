angular.module("VirtualPetApp")
.service("ApplicationService", ["$http", "$rootScope", function($http, $rootScope) {

    this.msPerHour = 1000 * 60 * 60;

    //for testing
    this.timeLastExecuted = Date.now();

    // constants
    this.actionInfos = {
        sleep: {
        },
        feed: {
            // msUntilNeeded: 4 * this.msPerHour,
            msUntilMissed: 10000,
            // msUntilMissed: 5 * this.msPerHour,
            moodDeltas: {
                missed: -20,
                acted: 10,
            },
            healthDeltas: {
                missed: -20,
                acted: 10,
            }
        },
        clean: {
        },
        exercise: {
        },
        nurse: {
        }
    }

    // call onlogin, setTimeouts
    // gets all stats
    this.getStats = function() {
        return $http({
            url: "/api/users",
            method: "GET"
        }).then(function(res) {
            return res.data;
        });
    };

    this.saveStats = function(activity, lastDate) {
        // finish put route for stats
        return $http.put("/api/users");
    };


    this.checkForUpdate = function() {
            console.log("fire");

            var run = function() {
                console.log("Run ran");
                var now = Date.now();
                
                var actionInfo = this.actionInfos.feed;
                var msUntilMissed = actionInfo.msUntilMissed;
                if(now > this.timeLastExecuted + msUntilMissed) {
                    console.log("if ran");
                    this.mood += actionInfo.moodDeltas.missed;
                    this.health += actionInfo.healthDeltas.missed;
                    $rootScope.$broadcast("update", this);
                }
            }.bind(this)();


        // this.getStats()
        //     .then(function(stats) {
        //         var timeLastExecuted = new Date();
        //         var now = new Date();
        //         var actionInfo = this.actionInfos.feed;
        //         var msUntilMissed = actionInfo.msUntilMissed;
        //         if(now > timeLastExecuted + msUntilMissed) {
        //             this.mood += actionInfo.moodDeltas.missed;
        //             this.health += actionInfo.healthDeltas.missed;
        //             $rootScope.$broadcast("update", this);
        //         }
        //     }.bind(this));



        // get stats from db
        // do calculations
        // if missed acition broadcast "miss" to stats component
            //>> if currentTime-nextTime = 0
            // then sets action's next time
        // if stats are different broadcast to components for update
    }.bind(this);

    // game loop, where should this be called?
    setInterval(this.checkForUpdate, 3000);

    this.mood = 100;
    this.health = 100;
}]);