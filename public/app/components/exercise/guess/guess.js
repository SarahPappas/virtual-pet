(function() {
  angular.module("VirtualPetApp")
  .component("guess", {
    templateUrl: "app/components/exercise/guess/guess.html",
    controller: GuessCtrl,
    controllerAs: "guess"
  });

  function GuessCtrl() {
    var leftArrow = document.getElementById("guessArrow1");
    var rightArrow = document.getElementById("guessArrow2");
    var winner = document.getElementById("guessWinner");
    var loser = document.getElementById("guessLoser");
    var userChoice;

    function randomNum() {
      return Math.floor(Math.random()*2+1);
    }   

    rightArrow.addEventListener('click', function() {
      rightArrow.style.display= "none";
      leftArrow.style.display= "none";
      userChoice= 1;
      randomNum();
      setTimeout(function() {
        rightArrow.style.display= "block";
        leftArrow.style.display= "block";
      }, 2000);
        if(randomNum() == userChoice) {
          winner.style.display = "block";
          setTimeout(function() {
            winner.style.display = "none";
          }, 2000);
        }
        else {
        loser.style.display = "block";
        setTimeout(function() {
            loser.style.display = "none";
          }, 2000);
        }
    });
    leftArrow.addEventListener('click', function() {
      rightArrow.style.display= "none";
      leftArrow.style.display= "none";
      userChoice= 2;
      randomNum();
      setTimeout(function() {
        rightArrow.style.display= "block";
        leftArrow.style.display= "block";
      }, 2000);
        if(randomNum() == userChoice) {
          winner.style.display = "block";
          setTimeout(function() {
            winner.style.display = "none";
          }, 2000);
        }
        else {
          loser.style.display = "block";
          setTimeout(function() {
            loser.style.display = "none";
          }, 2000);
        }
    }); 
  }
})()