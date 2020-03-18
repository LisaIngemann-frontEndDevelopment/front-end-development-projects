// Function to toggle mobile menu
function toggleMenu() {
    var menu = document.querySelector(".main-nav");

    if(menu.style.display == "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
};

// Function to show menu items on window resize
window.addEventListener("resize", function() {
    var menu = document.querySelector(".main-nav");

    if(document.getElementById("canvas")) {
        canvas.style.width = "auto";
    }

    if(innerWidth >= 1001) {
        menu.style.display = "block";
    } else if(innerWidth <= 1000) {
        menu.style.display = "none";
    }
});

// Event listener to make mobile menu disappear when user clicks outside of the menus 
window.addEventListener("mouseup", function(event) {
    var menu = document.querySelector(".main-nav");
    var mobileMenu = document.querySelector(".hamburger-nav i");

    if ((menu.style.display == "block") && (innerWidth <= 1000) && (event.target != (menu && mobileMenu))) {
        menu.style.display = "none";
    }
});

// Event listener to make mobile menu disappear when user scrolls 
window.addEventListener("scroll", function() {
    var menu = document.querySelector(".main-nav");

    if((innerWidth <= 1000) && (menu.style.display == "block")) {
        menu.style.display = "none";
    }
});