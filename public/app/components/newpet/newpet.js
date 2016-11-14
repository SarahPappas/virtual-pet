(function() {
	angular.module("VirtualPetApp")
	.component("newPet", {
		templateUrl: "app/components/newpet/newpet.html",
		controller: NewPetCtrl,
		controllerAs: "newpet"
	});

	function NewPetCtrl($http, ApplicationService, $scope, $state, $timeout) {
		var newPetCtrl = this;
		console.log("NewPetCtrl loaded!");
		newPetCtrl.noSpecies = false;
		newPetCtrl.noName = false;

		newPetCtrl.newPet = {
      		petname: "",
      		species: "",
      		birthday: Date.now(),
      		health: 100,
      		mood: 100,
      		stats: [
        			{
          			  name: "sleep",
         			  last: Date.now(),
			          isSleeping: "false"
			        },
			        {
			          name: "feed",
			          last: Date.now()
			        },
			        {
			          name: "clean",
			          last: Date.now(),
			          hasPooped: "false"
			        },
			        {
			          name: "exercise",
			          last: Date.now()
			        },
			        {
			          name: "nurse",
			          last: Date.now()
			        }
      		]	
    	}

    	newPetCtrl.createPet = function(){
    		if(newPetCtrl.newPet.petname.length === 0){
    			newPetCtrl.noName = true;
    			$timeout(function(){newPetCtrl.noName = !newPetCtrl.noName}, 4000);
    		}
    		else if(newPetCtrl.newPet.species.length === 0){
    			newPetCtrl.noSpecies = true;
    			$timeout(function(){newPetCtrl.noSpecies = !newPetCtrl.noSpecies}, 4000);
    		}
    		else {
	    		$http({
	        		url: "/api/users/newPet",
	       			method: "PUT",
	       			data: newPetCtrl.newPet
	      		}).then(function(res){
	      			$state.go('backPlay');
	      		});
      		}
    	}
	}

	NewPetCtrl.$inject = ['$http', 'ApplicationService', '$scope', '$state', '$timeout'];
})()