(function() {
	angular.module("VirtualPetApp")
	.component("gameOver", {
		templateUrl: "app/components/gameover/gameover.html",
		controller: Gameover,
		controllerAs: "Gameover"
	});

	function Gameover($http, ApplicationService, $scope, $interval, $state) {
		console.log("gameover controller loaded!");
		this.health;

		this.checkHealth = function(){
			$http({
	          url: "/api/users/stats",
	          method: "GET"
	     	})
	      	.then(function(res) {
	        	if(!res) {
	          		console.log("front-end error when getting Stats");
	        	} 
	        	else {
	         		this.health = res.data.pet.health;
	         		if(this.health === 0) {
	     				console.log("your pet is dead!");
	     				$state.go('gameover');
	     			}
	        	}
	     	});
     	};

     	$interval(this.checkHealth, 3000);


	}

	Gameover.$inject = ['$http', 'ApplicationService', '$scope', '$interval', '$state'];
})()