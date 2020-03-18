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