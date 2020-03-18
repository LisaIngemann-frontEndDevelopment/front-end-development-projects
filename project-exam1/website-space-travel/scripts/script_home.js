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

// Function to display menu items on screens equal to or greater than 1201px
window.onresize = function() {
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
};

// Fetch APIs
// Connect to ISS location API, make it into a JSON object and update it every 1000 ms
// Global variable
var ISSLocation = null;

// Function to fetch API and make it into a JSON object
function customFetchISSLoc(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState !== 4) {
            // Block until we are ready to process the XML request
            return;
        }

        if (xhr.status >= 200 && xhr.status < 300) {
            // Success, we retrieved the data and the status message reported it as successful
            var jsonData = JSON.parse(xhr.responseText);
            callback(jsonData)
        }
    }

    // Open the request
    xhr.open("GET", url);
    xhr.send();
}

// Run the customFetchISSLoc function to get JSON from API, send the JSON to informationToISSLocation and run it, 
// and set global variable to contain the JSON  
(function() {
    customFetchISSLoc("http://api.open-notify.org/iss-now.json",
        function(jsonData){
            informationToISSLocation(jsonData);
            ISSLocation = jsonData;
        });
    setTimeout(arguments.callee, 1000);
})();

// Display the ISSs current location
function informationToISSLocation(ISSLocation) {
    var location = document.querySelector(".ISS_location");
    var showMapButton = document.querySelector(".show_map");

    if (ISSLocation.message == "success") {
        location.innerHTML = 'The ISS is currently orbiting over latitude: <b>' + ISSLocation.iss_position.latitude + '</b> longitude: <b>' + ISSLocation.iss_position.longitude + '</b>';
    } else {
        location.innerHTML = "Location is currently unavailable. Try again later."
        showMapButton.style.display = "none"
    }
};

// Show map of location on button click
function showMap() {
    var showMap = document.querySelector(".show_map");
    var map = document.querySelector(".mapOfISSLocation")
    var showMapButton = document.querySelector(".show_map")

    map.innerHTML = '<iframe class="map" src="https://maps.google.com/maps?q=' + ISSLocation.iss_position.latitude + ',' + ISSLocation.iss_position.longitude + '&amp;output=embed&z=4" frameborder="0" style="border:0;" allowfullscreen=""></iframe>';
    showMap.innerHTML = "Load new map";
    showMapButton.style.borderBottomLeftRadius = "0"
    showMapButton.style.borderBottomRightRadius = "0"
};

// Connect to Humans in space API, make it into a JSON object and update it every 10000 ms
// Global variable
var humansInSpace = null;

// Function to fetch API and make it into a JSON object
function customFetchHumans(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState !== 4) {
            // Block until we are ready to process the XML request
            return;
        }

        if (xhr.status >= 200 && xhr.status < 300) {
            // Success, we retrieved the data and the status message reported it as successful
            var jsonData = JSON.parse(xhr.responseText);
            callback(jsonData)
        }
    }

    // Open the request
    xhr.open("GET", url);
    xhr.send();
}

// Run the customFetchHumans function to get JSON from API, send the JSON to informationTohumansInSpace and run it, 
// and set global variable to contain the JSON  
(function() {
    customFetchHumans("http://api.open-notify.org/astros.json",
        function(jsonData){
            informationToHumansInSpace(jsonData);
            humansInSpace = jsonData;
        });
    setTimeout(arguments.callee, 10000);
})();

// Display amount of humans currently in space
function informationToHumansInSpace(humansInSpace) {
    var humans = document.querySelector(".humans_amount");
    var iconContainer = document.querySelector(".human_icons");

    if (humansInSpace.message == "success") {
        humans.innerHTML = 'The current number of people in space is <b>' + humansInSpace.number + '</b>';  
    } else {
        humans.innerHTML = "Number of humans in space is currently unavaible. Try again later."
    }

    iconContainer.innerHTML = '';
    for (i = 0; i < humansInSpace.number; i++) {
        iconContainer.innerHTML += '<i class="icon-human-space"></i>';
    }
};