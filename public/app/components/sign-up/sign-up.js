(function() {
  angular.module('VirtualPetApp')
  .component('signUp', {
    templateUrl: 'app/components/sign-up/sign-up.html',
    controller: SignUpCtrl,
    controllerAs: 'SignUpCtrl'
  });

  function SignUpCtrl($http, $state){
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
      stats: [
        {
          name: "sleep",
          next: null,
          last: null
        },
        {
          name: "feed",
          next: null,
          last: null
        },
        {
          name: "clean",
          next: null,
          last: null
        },
        {
          name: "excercise",
          next: null,
          last: null
        },
        {
          name: "nurse",
          next: null,
          last: null
        }
      ]
    }
  };

  SignUpCtrl.loginInfo = {
    email: "",
    password: ""
  };

  SignUpCtrl.createUser = function() {
    $http.post('/api/users', SignUpCtrl.newUser)
    .then(function success(res){
      console.log("success: " + res);
      $state.go('play');
    }, function error(err){
      console.log("error: " + err);
    })
}

  SignUpCtrl.loginUser = function() {
    console.log(SignUpCtrl.logInInfo);
    $http({
      method: "GET",
      url: "/api/users/login",
      params: SignUpCtrl.loginInfo
    })
    .then(function success(res){
      console.log("success");
      console.log("user: " + res.user);
      console.log("token: " + res.token);
      headerComp.currentUser = res.data[0];
    }, function error(err){
      console.log('you done fucked up sir: ' + err);
    })
  }


  SignUpCtrl.$inject = ['$http', '$state'];
}
})()