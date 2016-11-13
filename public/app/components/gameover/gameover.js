(function() {
	angular.module("VirtualPetApp")
	.component("gameOver", {
		templateUrl: "app/components/gameover/gameover.html",
		controller: Gameover,
		controllerAs: "Gameover"
	});

	function Gameover(ApplicationService, $scope, $state) {
		var gameover = this;
		gameover.data = ApplicationService;

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
		    console.log("gameover", gameover.data.health);

    		if(gameover.data.health === 0) {
				$state.go('gameover');
			}
		})
	}

	Gameover.$inject = ['ApplicationService', '$scope', '$state'];
})()