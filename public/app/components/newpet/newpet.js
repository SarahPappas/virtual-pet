(function() {
	angular.module("VirtualPetApp")
	.component("newPet", {
		templateUrl: "app/components/newpet/newpet.html",
		controller: NewPetCtrl,
		controllerAs: "newpet"
	});

	function NewPetCtrl($http, ApplicationService, $scope, $state, $timeout) {
		var NewPetCtrl = this;
		console.log("NewPetCtrl loaded!");
		NewPetCtrl.noSpecies = false;
		NewPetCtrl.noName = false;

		NewPetCtrl.newPet = {
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
			          last: Date.now()
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

    	NewPetCtrl.createPet = function(){
    		if(NewPetCtrl.newPet.petname.length === 0){
    			NewPetCtrl.noName = true;
    			$timeout(function(){NewPetCtrl.noName = !NewPetCtrl.noName}, 4000);
    		}
    		else if(NewPetCtrl.newPet.species.length === 0){
    			NewPetCtrl.noSpecies = true;
    			$timeout(function(){NewPetCtrl.noSpecies = !NewPetCtrl.noSpecies}, 4000);
    		}
    		else {
	    		$http({
	        		url: "/api/users/newPet",
	       			method: "PUT",
	       			data: NewPetCtrl.newPet
	      		}).then(function(res){
	      			$state.go('backPlay');
	      		});
      		}
    	}

	}

	NewPetCtrl.$inject = ['$http', 'ApplicationService', '$scope', '$state', '$timeout'];
})()