(function() {
  angular.module('VirtualPetApp')
  .component('signUp', {
    templateUrl: 'app/components/sign-up/sign-up.html',
    controller: SignUpCtrl,
    controllerAs: 'SignUpCtrl'
  });

  function SignUpCtrl($http, $state, authService){
    console.log("SignUpCtrl loaded!");
    var SignUpCtrl = this;

    SignUpCtrl.signingUp = false;
    SignUpCtrl.loggingIn = false;

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
      type: "",
      health: 100,
      mood: 100,
      stats: [
        {
          name: "sleep",
          last: null
        },
        {
          name: "feed",
          last: null
        },
        {
          name: "clean",
          last: null
        },
        {
          name: "excercise",
          last: null
        },
        {
          name: "nurse",
          last: null
        }
      ]
    }
  };


  SignUpCtrl.createUser = function() {
    $http.post('/api/users', SignUpCtrl.newUser).then(function success(res) {
      $state.go('play');
    }, function error(err) {
      console.log(err);
    });
  }

  SignUpCtrl.loginInfo = {
    email: "",
    password: ""
  };

  SignUpCtrl.loginUser = function() {
    console.log(SignUpCtrl.loginInfo);
    $http.post('/api/users/auth', SignUpCtrl.loginInfo)
    .then(function success(res){
      console.log("res: " + res);
      authService.saveToken(res.data.token);
      $state.go('play');
    }, function error(err){
      console.log('There is an issue!: ' + err);
    })
  }


  SignUpCtrl.$inject = ['$http', '$state', 'authService'];
}
})()