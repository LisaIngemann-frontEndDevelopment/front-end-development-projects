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

// Connect to weather API, make it into a JSON object and update it every 10000 ms
// Function to fetch API and make it into a JSON object
var marsWeather = null;
function customFetch(url, callback) {
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

// Run the customFetch function to get JSON from API, send the JSON to informationWeatherReport and run it, 
// and set global variable to contain the JSON  
(function() {
    customFetch("https://api.nasa.gov/insight_weather/?api_key=v2QOmdOVY0UtJlJNduJsiJvdzfQQ1of0yUdddgvJ&feedtype=json&ver=1.0",
        function(jsonData){
            informationWeatherReport(jsonData);
            marsWeather = jsonData;
        });
})();

// Function to populate HTML with weather data
function informationWeatherReport(marsWeather) {
    var today1Sol = document.querySelector(".today1_sol");
    var today1Date = document.querySelector(".today1_date");
    var today2High = document.querySelector(".today2_high");
    var today2Low = document.querySelector(".today2_low");
    var today3Wind = document.querySelector(".today3_wind");
    var today3Pressure = document.querySelector(".today3_pressure");
    var report7 = document.querySelector(".report7");

    for (var i = 0; i < 7; ++i) {
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var report = document.querySelector(".report" + (i + 1));
        // Extract month from JSON string containing date and set it to the month name from the variable months.
        var month = months[parseInt(marsWeather[marsWeather.sol_keys[i]].First_UTC.substring(5, 7))-1];
        // Extract day from JSON string containing date
        var day = marsWeather[marsWeather.sol_keys[i]].First_UTC.substring(8,10);

        if((marsWeather.validity_checks[marsWeather.sol_keys[i]].AT.valid === true) && (marsWeather.validity_checks[marsWeather.sol_keys[i]].PRE.valid === true) && (i == 6)) {
            today1Sol.innerHTML = 'Sol ' + marsWeather.sol_keys[i];
            today1Date.innerHTML =  month + ' ' + day
            today2High.innerHTML = '<span class="calcTemp">' + marsWeather[marsWeather.sol_keys[i]].AT.mx.toFixed(0) + '</span>°';
            today2Low.innerHTML =  '<span class="calcTemp">' + marsWeather[marsWeather.sol_keys[i]].AT.mn.toFixed(0) + '</span>°';
            today3Wind.innerHTML =  marsWeather[marsWeather.sol_keys[i]].HWS.av.toFixed(2) + ' m/s';
            today3Pressure.innerHTML =  marsWeather[marsWeather.sol_keys[i]].PRE.av.toFixed(0) + ' Pa';

            report7.innerHTML =
                '<h3 class="report_sol">Sol ' + marsWeather.sol_keys[6] + '</h3>' +
                '<p class="report_date">' + month + ' ' + day + '</p>' +
                '<p class="report_temperature"><b><span class="high calcTemp">' + marsWeather[marsWeather.sol_keys[6]].AT.mx.toFixed(0) + '</span>° <span class="degree_indicator" style="font-size:12px;">C</span></p></b> <span class="calcTemp" style="font-size:12px;">' + marsWeather[marsWeather.sol_keys[6]].AT.mn.toFixed(0) + '</span>° <span class="degree_indicator" style="font-size:12px;">C</span></p>' +
                '<p class="report_wind">' + marsWeather[marsWeather.sol_keys[6]].HWS.av.toFixed(2) + ' m/s</p>' +
                '<p class="report_pressure">' + marsWeather[marsWeather.sol_keys[6]].PRE.av.toFixed(0) + ' Pa</p>';
        } else if((marsWeather.validity_checks[marsWeather.sol_keys[i]].AT.valid == true) && (marsWeather.validity_checks[marsWeather.sol_keys[i]].PRE.valid == true)) {
            report.innerHTML =
                '<h3 class="report_sol">Sol ' + marsWeather.sol_keys[i] + '</h3>' +
                '<p class="report_date">' + month + ' ' + day + '</p>' +
                '<p class="report_temperature"><b><span class="high calcTemp">' + marsWeather[marsWeather.sol_keys[i]].AT.mx.toFixed(0) + '</span>° <span class="degree_indicator" style="font-size:12px;">C</span></p></b> <span class="calcTemp">' + marsWeather[marsWeather.sol_keys[i]].AT.mn.toFixed(0) + '</span>° <span class="degree_indicator" style="font-size:12px;">C</span></p></p>' +
                '<p class="report_pressure">' + marsWeather[marsWeather.sol_keys[i]].PRE.av.toFixed(0) + ' Pa</p>';
        } else {
            today1Sol.innerHTML = 'Sol ' + marsWeather.sol_keys[i];
            today1Date.innerHTML =  month + ' ' + day
            report.innerHTML =
                '<h3 class="report_sol">Sol ' + marsWeather.sol_keys[i] + '</h3>' +
                '<p class="report_date">' + month + ' ' + day + '</p>' +
                '<p class="report_temperature">No Data</p>';
        }
    }
};

// Function to fetch weather from weather API and make it into a JSON object
function customFetchWeather(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState !== 4) {
            // Block until we are ready to process the XML request
            return;
        }
 
        if ((xhr.status >= 200 && xhr.status < 300) || (xhr.status == 404)) {
            // Success, we retrieved the data and the status message reprted it as successful
            var jsonData = JSON.parse(xhr.responseText);
            callback(jsonData)
        }
    }
 
    // Open the request
    xhr.open("GET", url);
    xhr.send();
}
 
// Global variable for user's weather
var userLocationWeather = null

// Onclick function to compare to users weather
function compareWeather() {    
    var inputCity = document.querySelector(".input_city");
    var noInputErr = document.querySelector(".noInputErr");
    var wrongInputErr = document.querySelector(".wrongInputErr");
    var compareButton = document.querySelector(".compare_btn");
    var compareContainer = document.querySelector(".compare");

    wrongInputErr.style.display = "none";
    noInputErr.style.display = "none";
    if(inputCity.value != "") {
        customFetchWeather("http://api.openweathermap.org/data/2.5/weather?q=" + inputCity.value + "&units=metric&APPID=5e9c9ce7a58ea4f5ac77b520b1d941ed",
            function (jsonData) {
                weatherCompareToHTML(jsonData);
                userLocationWeather = jsonData;
            });
    } else {
        noInputErr.style.display = "block";
        compareContainer.style.display = "none";
        compareButton.style.borderBottomLeftRadius = "30px"
        compareButton.style.borderBottomRightRadius = "30px"
    } 
};
 
function weatherCompareToHTML(userLocationWeather) {
    var tempMax = document.querySelector(".tempMax");
    var tempMin = document.querySelector(".tempMin");
    var windSpeed = document.querySelector(".wind");
    var pressure = document.querySelector(".pressure");
    var compareButton = document.querySelector(".compare_btn");
    var compareContainer = document.querySelector(".compare");
    var wrongInputErr = document.querySelector(".wrongInputErr");
    var noInputErr = document.querySelector(".noInputErr");
    var fahrenheit = document.querySelector(".fahrenheit1");

    if(userLocationWeather.cod != "404") {
        wrongInputErr.style.display = "none";
        noInputErr.style.display = "none";

        compareButton.style.borderBottomLeftRadius = "0"
        compareButton.style.borderBottomRightRadius = "0"
        compareContainer.style.display = "block";

        // If F has active class do calculations to the min and max them to convert them to fahrenheit
        if(fahrenheit.classList.contains("active_temperature")) {
            var toFahrenheit1 = userLocationWeather.main.temp_max.toFixed(0) * 9 / 5 + 32;
            var toFahrenheit2 = userLocationWeather.main.temp_min.toFixed(0) * 9 / 5 + 32;

            tempMax.innerHTML = 'High: <span class="calcTemp">' + toFahrenheit1.toFixed(0) + '</span>° <span class="degree_indicator" style="font-size:12px;">F</span>';
            tempMin.innerHTML = 'Low: <span class="calcTemp">' + toFahrenheit2.toFixed(0) + '</span>° <span class="degree_indicator" style="font-size:12px;">F</span>';
            windSpeed.innerHTML = 'Wind Speed: ' + userLocationWeather.wind.speed + ' m/s';
            pressure.innerHTML = 'Pressure: ' + userLocationWeather.main.pressure + '00 Pa';
        } else {
            tempMax.innerHTML = 'High: <span class="calcTemp">' + userLocationWeather.main.temp_max.toFixed(0) + '</span>° <span class="degree_indicator" style="font-size:12px;">C</span>';
            tempMin.innerHTML = 'Low: <span class="calcTemp">' + userLocationWeather.main.temp_min.toFixed(0) + '</span>° <span class="degree_indicator" style="font-size:12px;">C</span>';
            windSpeed.innerHTML = 'Wind Speed: ' + userLocationWeather.wind.speed + ' m/s';
            pressure.innerHTML = 'Pressure: ' +userLocationWeather.main.pressure + '00 Pa';
        }

    } else {
        wrongInputErr.style.display = "block"
        compareContainer.style.display = "none";
        compareButton.style.borderBottomLeftRadius = "30px"
        compareButton.style.borderBottomRightRadius = "30px"
    }
};

// Onclick function to change degrees to display as fahrenheit
function fahrenheit(clickedButton) {
    var celsius1 = document.querySelector(".celsius1");
    var celsius2 = document.querySelector(".celsius2");
    var fahrenheit1 = document.querySelector(".fahrenheit1");
    var fahrenheit2 = document.querySelector(".fahrenheit2");

    var tempIndicator = document.querySelectorAll(".degree_indicator");
    var calculateTemperature = document.querySelectorAll(".calcTemp");

    var toFahrenheit = marsWeather[marsWeather.sol_keys[0]].AT.mx.toFixed(0) * 9 / 5 + 32;

    if(clickedButton.classList.contains("active_temperature") == false) {
        for (i = 0; i < calculateTemperature.length; i++) {
            if(!isNaN(calculateTemperature[i].innerHTML)) { 
                var toFahrenheit = calculateTemperature[i].innerHTML * 9 / 5 + 32;
                calculateTemperature[i].innerHTML = toFahrenheit.toFixed(0);
            } 
        }

        for (i = 0; i < tempIndicator.length; i++) {
            tempIndicator[i].innerHTML = "F";
        }
        celsius1.classList.remove("active_temperature");
        celsius2.classList.remove("active_temperature");
        fahrenheit1.classList.add("active_temperature");
        fahrenheit2.classList.add("active_temperature");
    } 
};

// Onclick function to change degrees to display as celsius
function celsius(clickedButton) {
    var celsius1 = document.querySelector(".celsius1");
    var celsius2 = document.querySelector(".celsius2");
    var fahrenheit1 = document.querySelector(".fahrenheit1");
    var fahrenheit2 = document.querySelector(".fahrenheit2");

    var tempIndicator = document.querySelectorAll(".degree_indicator");
    var calculateTemperature = document.querySelectorAll(".calcTemp");

    if(clickedButton.classList.contains("active_temperature") == false) {
        for (i = 0; i < calculateTemperature.length; i++) {
            if(!isNaN(calculateTemperature[i].innerHTML)) {
                var toCelsius = (calculateTemperature[i].innerHTML -32) * 5 / 9;
                calculateTemperature[i].innerHTML = toCelsius.toFixed(0);
            }
        }

        for (i = 0; i < tempIndicator.length; i++) {
            tempIndicator[i].innerHTML = "C";
        }
        celsius1.classList.add("active_temperature");
        celsius2.classList.add("active_temperature");
        fahrenheit1.classList.remove("active_temperature");
        fahrenheit2.classList.remove("active_temperature");
    }
};

// Global variable for slideshow information
var slideshowInformation = [
    {
        "rover": "Curiosity",
        "left": "0",
        "camera": "Front Hazard Avoidance Camera",
        "date": "2019-08-18"
    },
    {
        "rover": "Curiosity",
        "left": "-100%",
        "camera": "Mars Hand Lens Imager",
        "date": "2019-03-17"
    },
    {
        "rover": "Curiosity",
        "left": "-200%",
        "camera": "Navigation Camera",
        "date": "2018-03-22"
    },
    {
        "rover": "Curiosity",
        "left": "-300%",
        "camera": "Mast Camera",
        "date": "2016-10-25"
    },
    {
        "rover": "Opportunity",
        "left": "-400%",
        "camera": "Panoramic Camera",
        "date": "2010-01-02"
    },
    {
        "rover": "Opportunity",
        "left": "-500%",
        "camera": "Navigation Camera",
        "date": "2009-09-09"
    },
    {
        "rover": "Opportunity",
        "left": "-600%",
        "camera": "Rear Hazard Avoidance Camera",
        "date": "2004-02-02"
    },
    {
        "rover": "Spirit",
        "left": "-700%",
        "camera": "Panoramic Camera",
        "date": "2005-05-31"
    },
    {
        "rover": "Spirit",
        "left": "-800%",
        "camera": "Front Hazard Avoidance Camera",
        "date": "2005-02-17"
    },
    {
        "rover": "Spirit",
        "left": "-900%",
        "camera": "Front Hazard Avoidance Camera",
        "date": "2004-04-15"
    }
]

// Function to change the class on the clicked button and shows the corresponding image
function imageSelector(clickedButton) {
    var imageTextRover = document.querySelector(".information_rover");
    var imageTextDate = document.querySelector(".information_date");
    var imageTextCamera = document.querySelector(".information_camera");
    var slideshowPosition = document.querySelector(".image_container");
   
    for(i = 0; i < slideshowInformation.length; i++) {
        var button = document.getElementsByClassName("slider_btn")[i];
       
        button.classList.remove("active_btn");
        if(clickedButton == button) {
            slideshowPosition.style.left = slideshowInformation[i].left;
            imageTextRover.innerHTML = "ROVER: <b>" + slideshowInformation[i].rover + "</b>";
            imageTextDate.innerHTML = "DATE: <b>" + slideshowInformation[i].date + "</b>";
            imageTextCamera.innerHTML = "CAMERA: <b>" + slideshowInformation[i].camera + "</b>";
        }    
    }
 
    clickedButton.classList.add("active_btn");
};

// Function to reset slideshow image position to image 1 on page reload
window.onload = function () {
    var slideshowPosition = document.querySelector(".image_container");
    slideshowPosition.style.left = "0";
};