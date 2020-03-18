// Function to congratulate winning player
var playButton = document.querySelector(".replay-play-btn");
var winnerContainer = document.querySelector(".winner-section");
var replaySection = document.querySelector(".replay");

if (localStorage.getItem("winner") === null) {
    winnerContainer.innerHTML = '<p class="content">You have not played the game yet so there is noone to congratulate!</p>';
	playButton.innerHTML = "Choose Characters To Play!"
	replaySection.style.height = "850px";
} else {
    var gratulate = document.querySelector(".winner-section__congratulations");
    var imageSrc = document.querySelector(".winner-section__iron-throne-img");
    var winnerFull = localStorage.getItem("winner");
	var winnerFN = winnerFull.replace(/ .*/,'');
	var winner = winnerFN.toLowerCase();
		
    imageSrc.src = "images/iron_throne_" + winner + ".png";
    gratulate.innerHTML = winnerFull + " is the winner! Congratulations!";
    localStorage.clear();

	// Falling snow animation
	window.onload = function() {
		var canvas = document.getElementById("canvas");
		var ctx = canvas.getContext("2d");
		var maxParticles = 80;
		var particlesArray = [];
		var w = window.innerWidth;
		var h = window.innerHeight;
		canvas.width = w;
		canvas.height = h;

		function random(min, max) {
			return min + Math.random() * (max - min + 1);
		};

		// Adjust canvas size on screen resize
		window.addEventListener("resize", function resize(e){
			var w = window.innerWidth;
			var h = window.innerHeight;
			canvas.width = w;
			canvas.height = h;
		});

		// Create snow particles
		function createSnow() {
			for(var i = 0; i < maxParticles; i++){
				particlesArray.push({
					x: Math.random() * w,  
					y: Math.random() * h,  
					speedX: random(-5, 5),  
					speedY: random(3, 7),    
					radius: random(0.4, 4),
				})
			}
		};

		// Draw the snow particles
		function drawSnow(){
			for(var i = 0; i < particlesArray.length; i++){    
				ctx.beginPath(); 
				ctx.arc(
				particlesArray[i].x,  
				particlesArray[i].y,  
				particlesArray[i].radius,  
				0,                         
				Math.PI*2,                 
				false                     
				);

				ctx.fillStyle = "rgba(255, 255, 255, 0.8)";   
				ctx.fill();                 
			}
		};

		// Make snow particles drop to the bottom of the screen
		function moveSnow(){
			for (var i = 0; i < particlesArray.length; i++) {
				particlesArray[i].x += particlesArray[i].speedX;     
				particlesArray[i].y += particlesArray[i].speedY;     

				if (particlesArray[i].y > h) {                                                                               
					particlesArray[i].x = Math.random() * w * 1.5;
					particlesArray[i].y = -50;
				}
			}
		};

		// Update the snow particles
		function updateSnowFall  () {
			var w = window.innerWidth;
			var h = window.innerHeight;
			canvas.width = w;
			canvas.height = h;
			ctx.clearRect(0, 0, w, h);
			drawSnow();
			moveSnow();
		};

		setInterval(updateSnowFall, 50);
		createSnow();
	};

	// Function to stop cheering
	function stopCheer () {
		document.querySelector(".hat1").classList.remove("hat-animate1");
		document.querySelector(".hat2").classList.remove("hat-animate2");
		document.querySelector(".hat3").classList.remove("hat-animate3");
		var cheerButton = document.querySelector(".winner-section__cheerContainer");

		cheerButton.innerHTML = '<a class="winner-section__cheer" onclick="cheer()">Cheer!</a>';
	};

	// Function to cheer
	function cheer() {
		document.querySelector(".hat1").classList.add("hat-animate1");
		document.querySelector(".hat2").classList.add("hat-animate2");
		document.querySelector(".hat3").classList.add("hat-animate3");
		var cheerButton = document.querySelector(".winner-section__cheerContainer");

		cheerButton.innerHTML = '<a class="winner-section__cheer" onclick="stopCheer()">Stop Cheer</a>';
	};
};