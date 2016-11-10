(function() {
  angular.module('VirtualPetApp')
  .component('signUp', {
    templateUrl: 'app/components/sign-up/sign-up.html',
    controller: SignUpCtrl,
    controllerAs: 'SignUpCtrl'
  });

  function SignUpCtrl($http, $state, authService, $timeout, ApplicationService){
    console.log("SignUpCtrl loaded!");
    var SignUpCtrl = this;

    SignUpCtrl.signingUp = false;
    SignUpCtrl.loggingIn = false;
    SignUpCtrl.noPassword = false;
    SignUpCtrl.noSpecies = false;
    SignUpCtrl.noPetname = false;
    SignUpCtrl.emailTaken = false;
    SignUpCtrl.userNotFound = false;
    SignUpCtrl.invalidPassword = false;

    SignUpCtrl.clickSignUp = function(){
      SignUpCtrl.signingUp = !SignUpCtrl.signingUp;
      SignUpCtrl.loggingIn = false;
    }

    SignUpCtrl.clickLogin = function(){
      SignUpCtrl.loggingIn = !SignUpCtrl.loggingIn;
      SignUpCtrl.signingUp = false;
    }
  

  SignUpCtrl.newUser = {
    email: "",
    password: "",
    pet : {
      petname: "",
      species: "",
      health: 100,
      mood: 100,
      stats: [
        {
          name: "sleep",
          last: Date.now(),
          isSleeping: false
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
          last: null
        }
      ]
    }
  };


  SignUpCtrl.createUser = function() {
    if(SignUpCtrl.newUser.password.length <= 6) {
      SignUpCtrl.noPassword = true;
      $timeout(function(){ SignUpCtrl.noPassword = !SignUpCtrl.noPassword }, 3000);
    }
    else if(SignUpCtrl.newUser.pet.petname.length === 0) {
      SignUpCtrl.noPetname = true;
      $timeout(function(){ SignUpCtrl.noPetname = !SignUpCtrl.noPetname }, 3000);
    }
    else if (SignUpCtrl.newUser.pet.species.length === 0) {
      SignUpCtrl.noSpecies = true;
      $timeout(function(){ SignUpCtrl.noSpecies = !SignUpCtrl.noSpecies }, 3000);
    }
    else {
    $http.post('/api/users', SignUpCtrl.newUser).then(function success(res) {
      // authService.saveToken(res.data.token);
      // $state.go('play');
      SignUpCtrl.signingUp = false;
      SignUpCtrl.loggingIn = true;
    }, function error(err) {
      console.log(err);
      if (err.status === 400){
        SignUpCtrl.emailTaken = true;
        $timeout(function(){ SignUpCtrl.emailTaken = !SignUpCtrl.emailTaken }, 3000);
      }
    });
  }
}

  SignUpCtrl.loginInfo = {
    email: "",
    password: ""
  };

  SignUpCtrl.loginUser = function() {
    console.log(SignUpCtrl.loginInfo);
    $http.post('/api/users/auth', SignUpCtrl.loginInfo)
    .then(function success(res){
      authService.saveToken(res.data.token);
      ApplicationService.onLogin();
      $state.go('play');
    }, function error(err){
      if(err.status === 400){
        SignUpCtrl.userNotFound = true;
        $timeout(function(){ SignUpCtrl.userNotFound = !SignUpCtrl.userNotFound }, 3000);
      }
      if(err.status === 401){
        SignUpCtrl.invalidPassword = true;
        $timeout(function(){ SignUpCtrl.invalidPassword = !SignUpCtrl.invalidPassword }, 3000);
      }
    })
  }


  SignUpCtrl.$inject = ['$http', '$state', 'authService', '$timeout', "ApplicationService"];
}
})()