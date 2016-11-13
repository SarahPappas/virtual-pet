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

    var mySprite =
     {
        x: 0,
        y: 330,
        width: 40,
        height: 50,
        speed: 200,
        color: '#c00'
    };

    var Sprites =
    {
       mySprite1 : {
        x: Math.random() * 330,
        y: -50,
        width: 40,
        height: 40,
        speed: 120,
        color: '#0c0'
      },

      mySprite2:{
        x: Math.random() * 340,
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
     
    function update(mod)
     {
        if (37 in keysDown)
      {
            mySprite.x -= mySprite.speed * mod;
        if(mySprite.x<0)
        mySprite.x = 0;
        if(mySprite.x == 0 && !touchleft)
      {   
        count+=10; 
        var alert1 = document.getElementById("score");
        alert1.innerHTML = "Score: " + count;
        touchright=false;
        touchleft=true;   
      }
        
        }
        if (39 in keysDown)
      {
            mySprite.x += mySprite.speed * mod;
        if(mySprite.x>360)
        mySprite.x = 360;
        
        if(mySprite.x == 360 && !touchright)
      {   
        count+=10; 
        var alert1 = document.getElementById("score");
        alert1.innerHTML = "Score: " + count;
        touchright=true;
        touchleft=false;    
      }
        }
    }

    function update1(mod)
    {
      for(index in Sprites)
      {
        if (Sprites.hasOwnProperty(index))
        {
          Sprites[index].y += Sprites[index].speed * mod;
        }   
      }
    }

    var alert1 = document.getElementById("score");
          alert1.innerHTML = "Score: " + count;
          
    function render()
    {
      //canvas
      ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      //moving red object
        ctx.fillStyle = mySprite.color;
        ctx.fillRect(mySprite.x, mySprite.y, mySprite.width, mySprite.height);

  //falling objects
  for(index in Sprites)
  {
    ctx.fillStyle = Sprites[index].color;
    ctx.fillRect(Sprites[index].x, Sprites[index].y, Sprites[index].width, Sprites[index].height);
    if (Sprites[index].y > 300)
    {  //Repeat the object when it falls out of view
      Sprites[index].y = -50 //Account for the image size
      Sprites[index].x = Math.random() * 400;    //Make it appear randomly along the width   
    
    }
    
    if (Sprites[index].x < mySprite.x + mySprite.width  && Sprites[index].x + Sprites[index].width  > mySprite.x &&
    Sprites[index].y < mySprite.y + mySprite.height && Sprites[index].y + Sprites[index].height > mySprite.y)
    {       
        alert("Game Over!");
        clearInterval(collision);
    }
  }
}
 
function run() 
{
    update((Date.now() - time) / 1000);
  update1((Date.now() - time) / 1000);
    render();
    time = Date.now();
}
      
var time = Date.now();
var collision = setInterval(run, 10);
  
    ApplicationService.startLoop(); 
  }
  DodgeCtrl.$inject = ["ApplicationService", '$state', '$scope'];
})()