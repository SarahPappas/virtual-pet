(function() {
  angular.module("VirtualPetApp")
  .component("sickpet", {
    templateUrl: "app/components/petpic/petpic.html",
    controller: SickCtrl,
    controllerAs: "sickpet"
  });

  function SickCtrl(ApplicationService, $http, $interval, $scope) {
    var sick = this;
    sick.health = ApplicationService;

      ApplicationService.startLoop();
      console.log(ApplicationService.species);

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
        var el = document.getElementById("default-anim");
        if(sick.health.health <= 50 && el.className == "c1-default-anim" || sick.health.health <= 50 && el.className == "c2-default-anim"
          || sick.health.health <= 50 && el.className == "c3-default-anim" || sick.health.health <= 50 && el.className == "c4-default-anim"
          ) {
          if (ApplicationService.species == "cat") {
              el.className ="c1-sick-anim";
          } else if (ApplicationService.species == "bat") {
              el.className ="c2-sick-anim";
          } else if (ApplicationService.species == "monkey") {
              el.className ="c4-sick-anim";
          } else {
              el.className ="c3-sick-anim";
          }
        }
      });


  }

  SickCtrl.$inject = ['ApplicationService', '$http', '$interval', "$scope"];
})()