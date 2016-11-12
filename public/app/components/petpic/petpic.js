(function() {
  angular.module("VirtualPetApp")
  .component("sickpet", {
    templateUrl: "app/components/petpic/petpic.html",
    controller: SickCtrl,
    controllerAs: "sickpet"
  });

  function SickCtrl(ApplicationService, $http, $interval) {
    var sick = this;

    sick.checkHealth = function(){
      $http({
            url: "/api/users/stats",
            method: "GET"
        })
          .then(function(res) {
            if(!res) {
                console.log("front-end error when getting Stats");
            }
            // else if(sick.health >= 30) {
            //   sick.health = res.data.pet.health;
            //   var el = document.getElementById("default-anim");
            //   if (ApplicationService.species == "cat") {
            //         el.className ="c1-default-anim";
            //     } else if (ApplicationService.species == "bat") {
            //         el.className ="c2-default-anim";
            //     } else if (ApplicationService.species == "monkey") {
            //         el.className ="c3-default-anim";
            //     } else {
            //         el.className ="c4-default-anim";
            //     }
            // } 
            else {
              sick.health = res.data.pet.health;
              if(sick.health <= 30) {
                console.log('Sick Pet!')
                var el = document.getElementById("default-anim");
                if (ApplicationService.species == "cat") {
                    el.className ="c1-sick-anim";
                } else if (ApplicationService.species == "bat") {
                    el.className ="c2-sick-anim";
                } else if (ApplicationService.species == "monkey") {
                    el.className ="c3-sick-anim";
                } else {
                    el.className ="c4-sick-anim";
                }
              }
            }
        });
      };

      $interval(sick.checkHealth, 3000);


  }

  SickCtrl.$inject = ['ApplicationService', '$http', '$interval'];
})()