// Array of playable characters
var characterArray = [
    {
        "id": 1,
        "sex": "male",
        "name": "Brandon Stark",
        "characterImage": "images/brandon.svg",
        "house": "Stark",
        "houseIcon": "stark",
        "culture": "Northmen",
        "alias": ["Prince of Winterfell", "Bran the Broken", "The Winged Wolf"]
    },
    {
        "id": 2,
        "sex": "female",
        "name": "Daenerys Targaryen",
        "characterImage": "images/daenerys.svg",
        "house": "Targaryen",
        "houseIcon": "targaryen",
        "culture": "Valyrian",
        "alias": ["Daenerys Stormborn", "Mother of Dragons"]
    },
    {
        "id": 3,
        "sex": "male",
        "name": "Tyrion Lannister",
        "characterImage": "images/tyrion.svg",
        "house": "Lannister",
        "houseIcon": "lannister",
        "culture": "Westerman",
        "alias": ["The Imp", "Dwarf"]
    },
    {
        "id": 4,
        "sex": "female",
        "name": "Arya Stark",
        "characterImage": "images/arya.svg",
        "house": "Stark",
        "houseIcon": "stark",
        "culture": "Northmen",
        "alias": ["Princess", "Arya Horseface", "Arry"]
    },
    {
        "id": 5,
        "sex": "male",
        "name": "Jon Snow",
        "characterImage": "images/jon.svg",
        "house": "Targaryen",
        "houseIcon": "targaryen",
        "culture": "Northmen",
        "alias": ["Ned Stark's Bastard", "Lord Commander of the Night's Watch", "Lord Snow"]
    },
    {
        "id": 6,
        "sex": "male",
        "name": "Theon Greyjoy",
        "characterImage": "images/theon.svg",
        "house": "Greyjoy",
        "houseIcon": "greyjoy",
        "culture": "Ironborn",
        "alias": ["Prince of Winterfell", "Prince of Fools", "Reek"]
    },
    {
        "id": 7,
        "sex": "male",
        "name": "Jaime Lannister",
        "characterImage": "images/jaime.svg",
        "house": "Lannister",
        "houseIcon": "lannister",
        "culture": "westerlands",
        "alias": ["Kingslayer", "Ser", "Lord Commander of the Kingsguard"]
    },
    {
        "id": 8,
        "sex": "male",
        "name": "Joffrey Baratheon",
        "characterImage": "images/joffrey.svg",
        "house": "Baratheon",
        "houseIcon": "baratheon",
        "culture": "Stormlander",
        "alias": ["Joffrey the Illborn", "Lord of the Seven Kingdoms", "The Young Usurper"]
    },
    {
        "id": 9,
        "sex": "male",
        "name": "Sandor Clegane",
        "characterImage": "images/sandor.svg",
        "house": "Clegane",
        "houseIcon": "clegane",
        "culture": "Westermen",
        "alias": ["The Hound"]
    },
    {
        "id": 10,
        "sex": "female",
        "name": "Margaery Tyrell",
        "characterImage": "images/margaery.svg",
        "house": "Tyrell",
        "houseIcon": "tyrell",
        "culture": "Westeros",
        "alias": ["The Little Queen", "Maid Margaery"]
    }
];

// Function to append character cards to the HTML
function addCharacters(characters) {
    var cardContainer = document.querySelector(".characters");

    for(i=0; i<characters.length; i++) {
        var alias = characters[i].alias.join(", ");

        var card = `<div class="characters__item" data-character="${characters[i].name}" onclick="addCharacter(this)">
                        <h3>${characters[i].name}</h3>
                        <img src="${characters[i].characterImage}" alt="Chess piece with hair corresponsing to character.">
                        <div class="characters__info">
                            <p><span class="card-category">Gender:</span> ${characters[i].sex}</p>
                            <p><span class="card-category">House:</span> ${characters[i].house}</p>
                        </div>
                        <div class="characters__house-icon">
                            <i class="house-icons icon-${characters[i].houseIcon}"></i>
                        </div>
                        <div class="characters__alias">
                            <p><span class="card-category">Alias/Title:</span> ${alias}</p>
                        </div>
                    </div>`;

        cardContainer.innerHTML += card;
    };
};
addCharacters(characterArray);

// click Event listener to add selected characters to list
function addCharacter(character) {
    var characterData = character.getAttribute("data-character");
    var characterList = document.querySelector(".selected-characters__list");
    var characterContainer = document.querySelector(".selected-characters");

    var addCharacter = `<span onclick="removeCharacter(this)"><li>${characterData}<span class="deselect"> X</span></li></span>`;

    characterList.innerHTML += addCharacter;
    character.classList.add("characters__item--inactive", "characters__item--active");
    characterContainer.style.marginBottom = "20px";
    displayPlay();
}; 

// Listener to remove character from list
function removeCharacter(character) {
    var characterContainer = document.querySelector(".selected-characters");
    var characters = document.querySelectorAll(".characters__item");
    var characterListItems = document.querySelectorAll(".selected-characters__list li");
    var characterText = character.childNodes[0].innerText;
    var characterText = characterText.substring(0, characterText.length -2);

    for(i=0; i < characters.length; i++) {
        var characterContent = characters[i].getAttribute("data-character");
        
        if(characterContent == characterText) {
            characters[i].classList.remove("characters__item--inactive", "characters__item--active")
            character.parentNode.removeChild(character);
        };
    }; 

    for(i=0; i < characterListItems.length; i++) {
        if(characterListItems.length == 1) {
            characterContainer.style.marginBottom = "0px";
        };
    };

    displayPlay();
};

// Function to show/hide play button if two characters have been selected and add/remove them to/from the local storage
function displayPlay() {
    var characters = document.querySelectorAll(".selected-characters__list li");
    var play = document.querySelector(".selected-characters__play-btn");
    var error = document.querySelector(".selected-characters__error");
    
    if(characters.length == 2) {
        play.style.display = "block";
        window.location.href = "#selected-characters";
        error.style.display = "none";

        var character1 = characters[0].innerText;
        var character1 = character1.substring(0, character1.length -2);
        var character2 = characters[1].innerText;
        var character2 = character2.substring(0, character2.length -2);

        localStorage.setItem("player1", character1);
        localStorage.setItem("player2", character2);
    } else if (characters.length >= 2){
        error.style.display = "block";
        play.style.display = "none";
        localStorage.removeItem("player1");
        localStorage.removeItem("player2");
    } else {
        play.style.display = "none";
        error.style.display = "none";
        localStorage.removeItem("player1");
        localStorage.removeItem("player2");
    }
};