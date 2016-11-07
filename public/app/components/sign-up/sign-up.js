(function() {
  angular.module('VirtualPetApp')
  .component('signUp', {
    templateUrl: 'app/components/sign-up/sign-up.html',
    controller: SignUpCtrl,
    controllerAs: 'SignUpCtrl'
  });

  function SignUpCtrl($http){
    console.log("SignUpCtrl loaded!");
    var SignUpCtrl = this;
  

  SignUpCtrl.newUser = {
    email: "",
    password: ""
  };

  // headerComp.logInInfo = {
  //   email: "",
  //   password: ""
  // };

  SignUpCtrl.createUser = function() {
    $http.post('/api/users', SignUpCtrl.newUser)
    .then(function success(res){
      console.log("success: " + res);
    }, function error(err){
      console.log("error: " + err);
    })
}

  // headerComp.logInUser = function() {
  //   console.log(headerComp.logInInfo);
  //   $http({
  //     method: "GET",
  //     url: "/api/users/login",
  //     params: headerComp.logInInfo
  //   })
  //   .then(function success(res){
  //     console.log("success");
  //     console.log("user: " + res.user);
  //     console.log("token: " + res.token);
  //     headerComp.currentUser = res.data[0];
  //   }, function error(err){
  //     console.log('you done fucked up sir: ' + err);
  //   })
  // }


  SignUpCtrl.$inject = ['$http'];
}
})()