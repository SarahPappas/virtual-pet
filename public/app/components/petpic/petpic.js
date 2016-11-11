(function() {
  angular.module("VirtualPetApp")
  .component("sickpet", {
    templateUrl: "app/components/petpic/petpic.html",
    controller: SickCtrl,
    controllerAs: "sickpet"
  });

  function SickCtrl(ApplicationService, $http, $interval) {
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
              if(this.health <= 30) {
                console.log('Sick Pet!')
                document.getElementsById('pet1').addClass('sickpet');
            }
            }
        });
      };

      $interval(this.checkHealth, 3000);


  }

  SickCtrl.$inject = ['ApplicationService', '$http', '$interval'];
})()