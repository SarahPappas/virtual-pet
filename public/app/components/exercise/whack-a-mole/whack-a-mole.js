(function() {
	angular.module("VirtualPetApp")
	.component("whackAMole", {
		templateUrl: "app/components/exercise/whack-a-mole/whack-a-mole.html",
		controller: WhackCtrl,
		controllerAs: "WhackCtrl"
	});

	function WhackCtrl() {
		var WhackCtrl = this;
		document.getElementById("moleYoda1").style.marginTop = '25%';
		document.getElementById("moleYoda2").style.marginTop = '40%';
		document.getElementById("moleYoda3").style.marginTop = '65%';
		WhackCtrl.lastYoda;
		WhackCtrl.score = 0;


		WhackCtrl.popUp = function() {
			var randomNum = Math.floor(Math.random()*3+1);
			if(WhackCtrl.lastYoda === randomNum) {
				WhackCtrl.popUp();
				return;
			}
			else {
				WhackCtrl.lastYoda = randomNum;
				var character = document.getElementById("moleYoda" + randomNum);
				console.log(character);
				var splitMargin = character.style.marginTop.split('');
				var currentMargin = parseInt(splitMargin[0] + splitMargin[1]);
				console.log(currentMargin);
				character.style.marginTop = currentMargin - 15 + '%';
				setTimeout(function(){character.style.marginTop = currentMargin + '%'}, 700)
			}
		}

		WhackCtrl.addPoint = function() {
			WhackCtrl.score += 1;
			// if(WhackCtrl.score === 5) {
			// 	window.location.assign("http://localhost:3000/play/");
			// }
		}

		setInterval(function(){ WhackCtrl.popUp() }, 3000);

	}

})()