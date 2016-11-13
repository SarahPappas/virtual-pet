(function() {
	angular.module("VirtualPetApp")
	.component("train", {
		templateUrl: "app/components/train/train.html",
		controller: TrainCtrl,
		controllerAs: "TrainCtrl"
	});

	function TrainCtrl($http, ApplicationService, $scope, $state) {
		var TrainCtrl = this;
		$http({
			url: "/api/users/stats",
			method: "GET"
		})
		.then(function(res){
			TrainCtrl.pet = res.data.pet;
			console.log(TrainCtrl.pet);
			TrainCtrl.createdAt = TrainCtrl.pet.birthday;
			TrainCtrl.daysOld = Math.ceil((Date.now()-TrainCtrl.createdAt)/86400000);
			console.log(TrainCtrl.daysOld);
		});
	}

	TrainCtrl.$inject = ['$http', 'ApplicationService', '$scope', '$state'];
})()