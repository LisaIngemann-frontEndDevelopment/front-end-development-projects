// Event listener to display nav on scroll
window.addEventListener("scroll", function() {
    var nav = document.querySelector(".fixed_main_nav");
    var supportPageOffset = window.pageXOffset !== undefined;
    var isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");
    var y = supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;
    
    if (y >= 300) {
        nav.style.opacity = 1;
    } else {
        nav.style.opacity = 0;
    }
});

// Event listener to display hamburger navigation
function toggleMenu() {
    var menu = document.querySelector(".main_nav_red");
    var background = document.querySelector(".hamburger_cntnr_red");

    if(menu.style.display == "block") {
        menu.style.display = "none";
        background.style.background = "none";
        background.style.borderBottom = "none";
    } else {
        menu.style.display = "block";
        background.style.background = "linear-gradient(90deg, rgba(255,255,255,1) 48%, rgba(146,146,146,1) 100%)";
        background.style.borderBottom = "2px solid #fff";
    }
};

// Event listener to display fixed hamburger navigation
function toggleFixedMenu() {
  var menu = document.querySelector(".fixed_links_red");
  var menuBackground = document.querySelector(".fixed_main_nav");

  if(menu.style.display == "block") {
      menu.style.display = "none";
      menuBackground.style.borderBottom = "none";
  } else {
      menu.style.display = "block";
      menuBackground.style.borderBottom = "1px solid #fff";
  }
};

// Event listener to make hamburger menus disappear when user clicks outside of the menus 
window.addEventListener("mouseup", function(event) {
    var mainMenu = document.querySelector(".main_nav_red");
    var menuBackground = document.querySelector(".hamburger_cntnr_red");

    if(mainMenu.style.display == "block" && innerWidth <= 1200 && event.target != (mainMenu && menuBackground) && event.target.parentNode != (mainMenu && menuBackground)) {
        mainMenu.style.display = "none";
        menuBackground.style.background = "none";
        menuBackground.style.borderBottom = "none";
    }

    var fixedMainMenuCntnr = document.querySelector(".fixed_main_nav");
    var fixedMainMenu = document.querySelector(".fixed_links_red");
    var fixedHamburgerMenu = document.querySelector("#fixedHamburgerMenu_red");
    
    if(fixedMainMenu.style.display == "block" && innerWidth <= 1200 && event.target != (fixedMainMenu && fixedHamburgerMenu) && event.target.parentNode != (fixedMainMenu)) {
        fixedMainMenu.style.display = "none";
        fixedMainMenuCntnr.style.borderBottom = "none";
    }
});

// Event listener to make hamburger menus disappear when user scrolls 
window.addEventListener("scroll", function() {
    var fixedMainMenuCntnr = document.querySelector(".fixed_main_nav");
    var fixedMainMenu = document.querySelector(".fixed_links_red");

    var mainMenu = document.querySelector(".main_nav_red");
    var menuBackground = document.querySelector(".hamburger_cntnr_red");

    if((innerWidth <= 1200) && ((fixedMainMenu.style.display == "block") || (mainMenu.style.display == "block"))) {
        fixedMainMenu.style.display = "none";
        fixedMainMenuCntnr.style.borderBottom = "none";
        mainMenu.style.display = "none";
        menuBackground.style.background = "none";
        menuBackground.style.borderBottom = "none";
    }
});

// Function to display menu items on screens equal to or greater than 1201px
window.onresize = function() {
    var menu = document.querySelector(".main_nav_red");
    var fixedMenu = document.querySelector(".fixed_links_red");
    var background = document.querySelector(".hamburger_cntnr_red");
    var menuBackground = document.querySelector(".fixed_main_nav");

    if(innerWidth >= 1201) {
        fixedMenu.style.display = "block";
        menu.style.display = "block";
        background.style.border = "none";
        menuBackground.style.borderBottom = "none";
    } else if(innerWidth <= 1200 && fixedMenu.style.display == "block" && menu.style.display == "block") {
        fixedMenu.style.display = "none";
        menu.style.display = "none";
        background.style.background = "none";
        background.style.borderBottom = "none";
    }
};

// NASA Science Live episodes object
var scienceEpisodes = [
    {
      "name": "Introduction",
      "src": "https://www.youtube.com/embed/uVHeE77lsW0",
      "description": "We’re taking you behind-the-scenes alongside our experts to explore the secrets of the universe. From remote locations on Earth, to the depths of outer space, join us live each month to interact with experts and watch as we reveal the mysteries of our solar system and beyond.",
      "id": "intro"
    },
    {
      "name": "Episode 1 - To the Moon, and Beyond",
      "src": "https://www.youtube.com/embed/vHH30wT87M8",
      "description": "This inaugural episode of NASA Science Live explores how science conducted on the lunar surface in the past informs current missions studying the Moon and future plans to send science, robots and humans to our nearest celestial neighbor.",
      "id": "ep1"
    },
    {
      "name": "Episode 2 - Going Interstellar",
      "src":"https://www.youtube.com/embed/4UD21rCcPpU",
      "description": "The second episode of NASA Science Live will take you to the very edge of our solar system where interstellar space begins. Starting with the Voyager mission at the boundary and traveling on to some of the closest and brightest stars, we'll answer questions like: What does \"going interstellar\" mean, how are we currently exploring outside our solar system and what plans do we have for the future of interstellar space travel?",
      "id": "ep2"
    },
    {
      "name": "Episode 3 - Our Weird Home",
      "src": "https://www.youtube.com/embed/JN-R716Tklo",
      "description": "The third episode of NASA Science Live highlights our weird home: Earth. Liquid water, a protective atmosphere and an active core that gives our planet a defensive shield. These features, plus more, make our home one of the most unique places in the solar system. Watch as we explore these features that make our planet special in celebration of Earth Day.",
      "id": "ep3"
    },
    {
      "name": "Episode 4 - Storms Across the Solar System",
      "src": "https://www.youtube.com/embed/HJRxYavtEpA",
      "description": "Did you know that there are storms churning all across our solar system and beyond? Watch as we tour some of the storms in our planetary neighborhood – from supersonic winds on Venus to dust storms on Mars. Then, we bring things closer to home to take a look at how NASA studies weather on Earth.",
      "id": "ep4"
    },
    {
      "name": "Episode 5 Special - Next Steps to Science on the Moon",
      "src": "https://www.youtube.com/embed/Ytd6NleTUNI",
      "description": "Moon news! We announced the next major step in the Artemis program’s exploration plans for the lunar surface. Meet the first three American companies that will land spacecraft on the Moon with NASA science and technology onboard.",
      "id": "ep5"
    },
    {
      "name": "Episode 6 Special - NASA's Next Solar System Explorer",
      "src": "https://www.youtube.com/embed/hBqDiHbfUsI",
      "description": "Our new NASA solar system mission, #Dragonfly, will send a rotocraft-lander to explore Saturn's moon, Titan! Why Titan? This ocean world is unique in the solar system, with organic compounds that could teach us about the origin of life itself. Watch this special edition of NASA Science Live to learn more and meet mission experts!",
      "id": "ep6"
    },
    {
      "name": "Episode 7 - 50 Years of Apollo",
      "src": "https://www.youtube.com/embed/nhJtMQTSD2k",
      "description": "From the historic Apollo splashdown to the future Artemis landing, we’re celebrating 50 years of human exploration and science on the Moon. This special edition of NASA Science Live will take viewers onboard the aircraft carrier that recovered the Apollo 11 capsule after splashdown – the USS Hornet. Join experts for a behind-the-scenes tour of this historic location where President Nixon first greeted the Apollo 11 crew. Discover what it takes to reenter Earth’s atmosphere and learn about the crew’s journey back to Earth. Splashdown may have been the conclusion of the crew’s mission, but it was just the beginning for the science. Hear from experts about what we learned from the Apollo missions, what we’re still uncovering today and what we hope to discover with future Artemis missions to the Moon.",
      "id": "ep7"
    },
    {
      "name": "Episode 8 - A World of Fires",
      "src": "https://www.youtube.com/embed/xoJFj6vedjg",
      "description": "At any given time, there is a fire burning somewhere on Earth. Join experts Thursday, September 12 at 3 p.m. EDT for a closer look at how fires are part of our changing planet. As the climate warms, it has directly affected the way fires occur, with longer fire seasons and more extreme fires that are harder to suppress. With a fleet of satellites orbiting Earth, NASA has a unique perspective to keep an eye on these fires, the impact they have on ecosystems, and how smoke degrades air quality for local communities and populations downwind from biomass burning.",
      "id": "ep8"
    }
]

// Onclick event to remove active class from all buttons and then add it to current clicked button
function buttonClicked(clickedButtonId) {
    var intro = document.getElementById("intro");
    var ep1 = document.getElementById("ep1");
    var ep2 = document.getElementById("ep2");
    var ep3 = document.getElementById("ep3");
    var ep4 = document.getElementById("ep4");
    var ep5 = document.getElementById("ep5");
    var ep6 = document.getElementById("ep6");
    var ep7 = document.getElementById("ep7");
    var ep8 = document.getElementById("ep8");

    var episodeArray = [intro, ep1, ep2, ep3, ep4, ep5, ep6, ep7, ep8];

    var iframeSRC = document.getElementById("iframeScience");
    var description = document.querySelector(".description");
    var episodeTitle = document.querySelector(".episodeTitle");

    // Clear all active classes
    for (i = 0; i < episodeArray.length; i++) {
        episodeArray[i].classList.remove("science_active");
    }
 
    // Reset properties to blank
    iframeSRC.src = "";
    description.innerHTML = "";
    episodeTitle.innerHTML = "";
 
    // Search for active science episode and add active class and content from object to it
    for (i = 0; i < episodeArray.length; i++) {
        if (clickedButtonId == scienceEpisodes[i].id) {
            episodeArray[i].classList.add("science_active");
            iframeSRC.src = scienceEpisodes[i].src;
            description.innerHTML = scienceEpisodes[i].description;
            episodeTitle.innerHTML = scienceEpisodes[i].name;    
        }    
    }
};