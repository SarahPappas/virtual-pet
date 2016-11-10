(function() {
  angular.module("VirtualPetApp")
  .component("guess", {
    templateUrl: "app/components/exercise/guess/guess.html",
    controller: GuessCtrl,
    controllerAs: "guess"
  });

  function GuessCtrl(ApplicationService) {
    var exercise = this;
    var vader = document.getElementById("vader");
    var leftArrow = document.getElementById("guessArrow1");
    var rightArrow = document.getElementById("guessArrow2");
    var winner = document.getElementById("guessWinner");
    var loser = document.getElementById("guessLoser");
    var userChoice;
    var totalPlay = 0;
    var totalWins = 0;


    ApplicationService.getStats();
    

    function randomNum() {
      return Math.floor(Math.random()*2+1);
    }   

    rightArrow.addEventListener('click', function() {
      rightArrow.style.display= "none";
      leftArrow.style.display= "none";
      userChoice= 1;
      totalPlay++;
      console.log(totalPlay);
      randomNum();
      setTimeout(function() {
        rightArrow.style.display= "block";
        leftArrow.style.display= "block";
      }, 2000);
        if(randomNum() == userChoice) {
          vader.style.left = "70px";
          winner.style.display = "block";
          vader.style.top = "0px";
          totalWins++
          setTimeout(function() {
            winner.style.display = "none";
            vader.style.left = "0px";
          }, 2000);
        }
        else {
        vader.style.left = "-70px";
        loser.style.display = "block";
        vader.style.top = "0px";
        setTimeout(function() {
            loser.style.display = "none";
            vader.style.left = "0px";
          }, 2000);
        }
        if(totalPlay >= 5 && totalWins >= 3) {
          winner.innerHTML = ' Congrats Mood Increased by 20%!';
          winner.style.display = "block"; 
          setTimeout(function() {
            window.location.assign("http://localhost:3000/play/");
          }, 2000);
        }
        else if(totalPlay >= 5){
          loser.innerHTML = ' Sorry, Need 3 Correct :(';
          loser.style.display = "block"; 
          setTimeout(function() {
            window.location.assign("http://localhost:3000/play/");
          }, 2000);
        }
    });
    leftArrow.addEventListener('click', function() {
      rightArrow.style.display= "none";
      leftArrow.style.display= "none";
      userChoice= 2;
      totalPlay++;
      console.log(totalPlay)
      randomNum();
      setTimeout(function() {
        rightArrow.style.display= "block";
        leftArrow.style.display= "block";
      }, 2000);
        if(randomNum() == userChoice) {
          vader.style.left = "-70px";         
          winner.style.display = "block";
          vader.style.top = "0px";
          totalWins++;
          setTimeout(function() {
            winner.style.display = "none";
            vader.style.left = "0px";
          }, 2000);
        }
        else {
          vader.style.left = "70px";
          loser.style.display = "block";
          vader.style.top = "0px";
          setTimeout(function() {
            loser.style.display = "none";
            vader.style.left = "0px";
          }, 2000);
        }
        if(totalPlay >= 5 && totalWins >= 3) {
          winner.innerHTML = ' Congrats Mood Increased by 25%!';
          winner.style.display = "block"; 
          setTimeout(function() {
            window.location.assign("http://localhost:3000/play/")
          }, 2000);
        }
        else if(totalPlay >= 5){
          console.log('loser');
        }
    }); 
  }
  GuessCtrl.$inject = ["ApplicationService"];
})()