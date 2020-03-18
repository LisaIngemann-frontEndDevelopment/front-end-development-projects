// Get search input from string
function getQueryInput(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    return "";
}

// Declare all results and split the keywords into an array
var result1 = document.getElementById("result1");
var result1 = result1.getElementsByClassName("keywords")[0].innerHTML.split(",");

var result2 = document.getElementById("result2");
var result2 = result2.getElementsByClassName("keywords")[0].innerHTML.split(",");

var result3 = document.getElementById("result3");
var result3 = result3.getElementsByClassName("keywords")[0].innerHTML.split(",");

var result4 = document.getElementById("result4");
var result4 = result4.getElementsByClassName("keywords")[0].innerHTML.split(",");

var result5 = document.getElementById("result5");
var result5 = result5.getElementsByClassName("keywords")[0].innerHTML.split(",");

var result = [result1, result2, result3, result4, result5];

// Put search input into search field and activate findResults function
var searchInput = document.querySelector(".searchInput")
var input = getQueryInput("keyword");
if (input != "") {
    searchInput.value += input; 
    findResults(result);
}

// Onkeyup function that activates filterSearchInput function with the value from the input field
function findResults() {
    filterSearchInput(document.querySelector(".searchInput").value);
}

// takes in input value and checks if any of the results contain that value
function doesInputMatchFilter(result, searchText) {
    return result.toLowerCase().indexOf(searchText.toLowerCase()) != -1
}

// filter through results to show matches to search input
function filterSearchInput(searchText) {

    // Iterate across all results, adding results which match the search filter
    for(var i = 0; i < result.length; i++) {
        var anyMatched = false;
        for (var j=0; j < result[i].length; ++j) {
            if (doesInputMatchFilter(result[i][j], searchText)) {
                anyMatched = true;
                break;
            }
        }

        // if anyMatched is true display matches, else set display to none
        if (anyMatched) {
            document.getElementById("result" + (i + 1)).style.display = "block";
        } else {
            document.getElementById("result" + (i + 1)).style.display = "none";
        } 

        // if input is empty set results display to none
        if (searchInput.value == "") {
            document.getElementById("result" + (i + 1)).style.display = "none";
        }
    }
    // if no results are set to display, show no match message, else set message to display none
    var allResultsHidden = true;
    var result1 = document.getElementById("result1").style.display;
    var result2 = document.getElementById("result2").style.display;
    var result3 = document.getElementById("result3").style.display;
    var result4 = document.getElementById("result4").style.display;
    var result5 = document.getElementById("result5").style.display;

    if ((result1 == "block") || (result2 == "block") || (result3 == "block") || (result4 == "block") || (result5 == "block")) {
        allResultsHidden = false;
    } else {
        allResultsHidden = true;
    }
    if (allResultsHidden) {
        document.querySelector(".no_result").style.display = "block";
    } else {
        document.querySelector(".no_result").style.display = "none";
    }
}  

