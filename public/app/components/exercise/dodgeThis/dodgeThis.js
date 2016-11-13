(function() {
  angular.module("VirtualPetApp")
  .component("dodge", {
    templateUrl: "app/components/exercise/dodgeThis/dodgeThis.html",
    controller: DodgeCtrl,
    controllerAs: "DodgeCtrl"
  });

  function DodgeCtrl(ApplicationService, $state, $scope) {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    var count = 0;
    var touchright = false;
    var touchleft = true;
    var keysDown = {};
    var time = Date.now();
    var collision = setInterval(run, 10);

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
    })

    ApplicationService.getStats()
      .then(function(res) {
      });

    var mySprite =
     {
        x: 0,
        y: 330,
        width: 40,
        height: 50,
        speed: 200,
        image: '/img/pickpet1.png'
    };

    var Sprites =
    {
       mySprite1 : {
        x: Math.random() * 370,
        y: -50,
        width: 30,
        height: 30,
        speed: 120,
        color: '#0c0'
      },

      mySprite2:{
        x: Math.random() * 390,
        y: -50,
        width: 40,
        height: 40,
        speed: 90,
        color: '#00c' 
      }
    }

    window.addEventListener('keydown', function(e) {
      keysDown[e.keyCode] = true;
    });
    window.addEventListener('keyup', function(e) {
        delete keysDown[e.keyCode];
    });
     
    function update(mod) {
      if (37 in keysDown) {
        mySprite.x -= mySprite.speed * mod;
          if(mySprite.x<0)
            mySprite.x = 0;
          if(mySprite.x == 0 && !touchleft) {   
            count+=10; 
            var alert1 = document.getElementById("dodgeScore");
            alert1.innerHTML = "Score: " + count;
            touchright=false;
            touchleft=true;   
          } 
      }
      if (39 in keysDown) {
        mySprite.x += mySprite.speed * mod;
          if(mySprite.x>400)
            mySprite.x = 400;
        if(mySprite.x == 400 && !touchright) {   
          count+=10; 
          var alert1 = document.getElementById("dodgeScore");
          alert1.innerHTML = "Score: " + count;
          touchright=true;
          touchleft=false;    
        }
      }
      else if (count >= 60) {
        alert1.innerHTML= 'Congrats Mood Increased by 10%!'
        clearInterval(collision);
        ApplicationService.calcStats("exercise", "acted");  
        setTimeout(function() {
          $state.go('backPlay');
        }, 3000);
      } 
    }



    function update1(mod) {
      for(index in Sprites) {
        if (Sprites.hasOwnProperty(index)) {
          Sprites[index].y += Sprites[index].speed * mod;
        }   
      }
    }

    var alert1 = document.getElementById("dodgeScore");
    alert1.innerHTML = "Score: " + count;
          
    function render() {
      //canvas
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      //moving red object
      var img = new Image();
      if (ApplicationService.species == "cat") {
          img.src = '/img/pickpet1.png';
        } else if (ApplicationService.species == "bat") {
          img.src = '/img/pickpet2.png';
        } else if (ApplicationService.species == "monkey") {
          img.src = '/img/pickpet3.png';
        } else {
          img.src = '/img/pickpet4.png';
        } 
      img.addEventListener('load', function() {
        ctx.drawImage(img, mySprite.x, mySprite.y, mySprite.width, mySprite.height);
      });
      // ctx.fillStyle = mySprite.color;
      // ctx.fillRect(mySprite.x, mySprite.y, mySprite.width, mySprite.height);
      //falling objects
      for(index in Sprites) {
        ctx.fillStyle = Sprites[index].color;
        ctx.fillRect(Sprites[index].x, Sprites[index].y, Sprites[index].width, Sprites[index].height);
          if (Sprites[index].y > 350) { 
            Sprites[index].y = -50
            Sprites[index].x = Math.random() * 400;    
          }
          
          if (Sprites[index].x < mySprite.x + mySprite.width  && Sprites[index].x + Sprites[index].width  > mySprite.x &&
          Sprites[index].y < mySprite.y + mySprite.height && Sprites[index].y + Sprites[index].height > mySprite.y) {       
            alert1.innerHTML= "Game Over!"
            clearInterval(collision);
            setTimeout(function() {
              $state.go('backPlay');
            }, 3000);

          }
      }
    }
     
    function run() {
      update((Date.now() - time) / 1000);
      update1((Date.now() - time) / 1000);
      
      render();
      time = Date.now();
    }
           
    ApplicationService.startLoop(); 
  }
  DodgeCtrl.$inject = ["ApplicationService", '$state', '$scope'];
})()