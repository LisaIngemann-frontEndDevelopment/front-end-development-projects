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
    var menu = document.querySelector(".main_nav");
    var background = document.querySelector(".hamburger_cntnr");

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

// Event listener to make hamburger menus disappear when user clicks outside of the menus 
window.addEventListener("mouseup", function(event) {
    var mainMenu = document.querySelector(".main_nav");
    var menuBackground = document.querySelector(".hamburger_cntnr");

    if(mainMenu.style.display == "block" && innerWidth <= 1200 && event.target != (mainMenu && menuBackground) && event.target.parentNode != (mainMenu && menuBackground)) {
        mainMenu.style.display = "none";
        menuBackground.style.background = "none";
        menuBackground.style.borderBottom = "none";
    }

    var fixedMainMenuCntnr = document.querySelector(".fixed_main_nav");
    var fixedMainMenu = document.querySelector(".fixed_links");
    var fixedHamburgerMenu = document.querySelector("#fixedHamburgerMenu");
    
    if(fixedMainMenu.style.display == "block" && innerWidth <= 1200 && event.target != (fixedMainMenu && fixedHamburgerMenu) && event.target.parentNode != (fixedMainMenu)) {
        fixedMainMenu.style.display = "none";
        fixedMainMenuCntnr.style.borderBottom = "none";
    }
});

// Event listener to make hamburger menus disappear when user scrolls 
window.addEventListener("scroll", function() {
    var fixedMainMenuCntnr = document.querySelector(".fixed_main_nav");
    var fixedMainMenu = document.querySelector(".fixed_links");

    var mainMenu = document.querySelector(".main_nav");
    var menuBackground = document.querySelector(".hamburger_cntnr");

    if((innerWidth <= 1200) && ((fixedMainMenu.style.display == "block") || (mainMenu.style.display == "block"))) {
        fixedMainMenu.style.display = "none";
        fixedMainMenuCntnr.style.borderBottom = "none";
        mainMenu.style.display = "none";
        menuBackground.style.background = "none";
        menuBackground.style.borderBottom = "none";
    }
});

// Event listener to display fixed hamburger navigation
function toggleFixedMenu() {
    var menu = document.querySelector(".fixed_links");
    var menuBackground = document.querySelector(".fixed_main_nav");

    if(menu.style.display == "block") {
        menu.style.display = "none";
        menuBackground.style.borderBottom = "none";
    } else {
        menu.style.display = "block";
        menuBackground.style.borderBottom = "1px solid #fff";
    }
};

// Display item 1 on year with multiple timeline items
function showItem1() {
    var item1_h2 = document.querySelector(".sputnik1_h2");
    var item1_text = document.querySelector(".sputnik1_text");
    var item1_img = document.querySelector(".sputnik1_img");
    var item2_h2 = document.querySelector(".sputnik2_h2");
    var item2_text = document.querySelector(".sputnik2_text");
    var item2_img = document.querySelector(".sputnik2_img");
    var button1 = document.querySelector(".selector1");
    var button2 = document.querySelector(".selector2");

    button1.style.background = "#929292";
    button2.style.background = "#fff";
    item1_h2.style.display = "block";
    item1_text.style.display = "block";
    item1_img.style.display = "block";
    item2_h2.style.display = "none";
    item2_text.style.display  = "none";
    item2_img.style.display = "none";
};

// Display item 2 on year with multiple timeline items
function showItem2() {
    var item1_h2 = document.querySelector(".sputnik1_h2");
    var item1_text = document.querySelector(".sputnik1_text");
    var item1_img = document.querySelector(".sputnik1_img");
    var item2_h2 = document.querySelector(".sputnik2_h2");
    var item2_text = document.querySelector(".sputnik2_text");
    var item2_img = document.querySelector(".sputnik2_img");
    var button1 = document.querySelector(".selector1");
    var button2 = document.querySelector(".selector2");

    button1.style.background = "#fff"
    button2.style.background = "#929292"
    item1_h2.style.display = "none"; 
    item1_text.style.display = "none";
    item1_img.style.display = "none";
    item2_h2.style.display = "block";
    item2_text.style.display = "block";
    item2_img.style.display = "block";
};

// Add event listeners to all buttons with active_year class, that when clicked will run displayTimelineItem function
window.onload = function listItems() {
    var classes = document.querySelector(".timeline_line_scroll").querySelectorAll(".active_year"); // Buttons

    for (var i = 0; i < classes.length; ++i) {
        // set the index
        classes[i].container_index = i; 
        classes[i].addEventListener("click", displayTimelineItem);
    }
};

// Display correct timeline item and hide others
function displayTimelineItem() {
    var prevActiveButton = document.querySelector(".active_timeline"); 
    var items = document.querySelector(".timeline").querySelectorAll(".timeline_item");

    for (var i = 0; i < items.length; ++i) { 
        var selected_item = items[i];

        if (i == this.container_index) { 
            selected_item.style.display = "block";
        } else {
            selected_item.style.display = "none";
        }
    }

    prevActiveButton.classList.remove("active_timeline"); // Remove active class from previous active
    this.classList.add("active_timeline"); // Add active class to clicked button
};


// Object for video descriptions
var videoDescriptionObject = [
    {
        "amos": "SpaceX is targeting Tuesday, August 6 for launch of AMOS-17 from Space Launch Complex 40 (SLC-40) at Cape Canaveral Air Force Station, Florida. The launch window opens at 6:53 p.m. EDT, or 22:53 UTC, and closes at 8:21 p.m. EDT, or 00:21 UTC on August 7. The satellite will be deployed approximately 31 minutes after liftoff.",
        "amosSecond": "Falcon 9’s first stage for the AMOS-17 mission previously supported the Telstar-19 VANTAGE mission in July 2018 and the Es’hail-2 mission in November 2018."
    },
    {
        "juno": "Commanding Juno after years of testing was at first a nerve-racking experience for the scientists, engineers and countless other collaborators from across the world. The team worked as a family to make sure that launch was a success, that all nine on-board instruments operate as designed, that navigation, once in flight, goes smoothly, and that the mission-critical Juno Orbit Insertion went exactly as planned.",
        "junoSecond": "\"We look at view graphs and charts and analyses all the time – what blows my mind is when I go out at night, and I look up at Jupiter, and I realize, we’re there.\" — Rick Nybakken, Project Manager 2012-2017, JPL",
        "junoThird": "Team Members: Heidi Becker, Scott Bolton, Jack Connerney, Jennifer Delavan, Maria Schellpfeffer, Paul Steffes, Marla Thornton. If you want to read more about the Juno Mission visit <a href=\"https://www.nasa.gov/mission_pages/juno/main/index.html\" class=\"inline_link\">NASA.gov</a>"
    },
    {
        "zarya": "Zarya is the first module of the International Space Station. Заря (Zarya) means “dawn” and was launched on 20 November 1998 by a Proton rocket from the Baikonur Cosmodrome in Kazakhstan. In December 1998, Space Shuttle Endeavour approached Zarya and docked the US module Unity."
    }
];

// Display selected video and hide the others
// Display Amos video
function showAmosVideo() {
    var amosVideo = document.querySelector(".amos_launch");
    var junoVideo = document.querySelector(".juno_launch");
    var zaryaVideo = document.querySelector(".zarya_launch");
    var videoContainer = document.querySelector(".video_container");
    var videoDescription = document.querySelector(".video_description");
    var videoH1 = document.querySelector(".launch_videos h1");

    videoH1.innerHTML = "Amos-17 Mission";
    junoVideo.style.display = "none"; 
    zaryaVideo.style.display = "none"; 
    amosVideo.style.display = "block";
    videoContainer.style.display = "block";
    videoDescription.innerHTML = 
        '<p>' + videoDescriptionObject[0].amos + '</p>\n' +
        '<p>' + videoDescriptionObject[0].amosSecond + '</p>';

    window.location.href = "launches.html#launch_anchor";
};

// Display Juno video
function showJunoVideo() {
    var amosVideo = document.querySelector(".amos_launch");
    var junoVideo = document.querySelector(".juno_launch");
    var zaryaVideo = document.querySelector(".zarya_launch");
    var videoContainer = document.querySelector(".video_container");
    var videoDescription = document.querySelector(".video_description");
    var videoH1 = document.querySelector(".launch_videos h1");

    videoH1.innerHTML = "Juno Mission";
    zaryaVideo.style.display = "none"; 
    amosVideo.style.display = "none";
    junoVideo.style.display = "block";
    videoContainer.style.display = "block";
    videoDescription.innerHTML = 
        '<p>' + videoDescriptionObject[1].juno + '</p>\n' +
        '<p>' + videoDescriptionObject[1].junoSecond + '</p>\n' +
        '<p>' + videoDescriptionObject[1].junoThird + '</p>';

    window.location.href = "launches.html#launch_anchor";
};

// Display Zarya video
function showZaryaVideo() {
    var amosVideo = document.querySelector(".amos_launch");
    var junoVideo = document.querySelector(".juno_launch");
    var zaryaVideo = document.querySelector(".zarya_launch");
    var videoContainer = document.querySelector(".video_container");
    var videoDescription = document.querySelector(".video_description");
    var videoH1 = document.querySelector(".launch_videos h1");

    videoH1.innerHTML = "Zarya Mission";
    amosVideo.style.display = "none";
    junoVideo.style.display = "none";
    zaryaVideo.style.display = "block";
    videoContainer.style.display = "block";
    videoDescription.innerHTML = 
        '<p>' + videoDescriptionObject[2].zarya + '</p>';

    window.location.href = "launches.html#launch_anchor";
};

// Resize function for all resize code 
window.onresize = function() {
    // Display menu items on screens equal to or greater than 1201px
    var menu = document.querySelector(".main_nav");
    var fixedMenu = document.querySelector(".fixed_links");
    var background = document.querySelector(".hamburger_cntnr");
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

    // Reset h1 to launch videos on screen sizes equal to or smaller than 560px
    var videoH1 = document.querySelector(".launch_videos h1");
    var amosVideo = document.querySelector(".amos_launch");
    var junoVideo = document.querySelector(".juno_launch");
    var zaryaVideo = document.querySelector(".zarya_launch");

    if(innerWidth <= 560) {
        videoH1.innerHTML = "Launch Videos";
    } else if((innerWidth >= 561) && (amosVideo.style.display == "block")){
        videoH1.innerHTML = "Amos-17 Mission";
    } else if((innerWidth >= 561) && (junoVideo.style.display == "block")){
        videoH1.innerHTML = "Juno Mission";
    } else if((innerWidth >= 561) && (zaryaVideo.style.display == "block")){
        videoH1.innerHTML = "Zarya Mission";
    } 
    
    // Display timeline items on screens equal to or greater than 1201px
    var timelineItem = document.querySelector(".timeline").querySelectorAll(".timeline_item");

    for (var i = 0; i < timelineItem.length; ++i) {
        var timelineYear = document.querySelector(".timeline_line_scroll").querySelectorAll(".active_year");

        if(innerWidth >= 1201) {
            timelineItem[i].style.display = "block";
        } else if((innerWidth <= 1200) && !(timelineYear[i].classList.contains("active_timeline"))) {
            timelineItem[i].style.display = "none";
        } 
    }
}; 