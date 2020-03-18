// Object with list data
var data = (localStorage.getItem("toBuyList")) ? JSON.parse(localStorage.getItem("toBuyList",)) : {
  toBuy: [],
  completed: []
}

// Remove and complete icons
removeIcon = '<i class="far fa-trash-alt"></i>';
completeIcon = '<span class="circle-empty"></span>'; 

// Run function to load item saved local storage
loadToBuyList();

// Click add button, if input has a value, add to item list
document.getElementById("add").addEventListener("click", function() {
  var value = document.getElementById("item").value
  if(value) {
    addItemToHTML(value);
    document.getElementById("item").value = "";

    data.toBuy.push(value);
    addItemToLocalStorage();
  }
});

// Activate function when input is not empty and enter is pressed
document.getElementById("item").addEventListener("keydown", function(event) {
  var value = this.value;
  if(event.code === "Enter" && value) {
    addItem(value);
  }
});

// Add Item to list
function addItem(value) {
  addItemToHTML(value);
  document.getElementById("item").value = "";

  data.toBuy.push(value);
  addItemToLocalStorage();
}

// Add items saved in local storage 
function loadToBuyList() {
  if(!data.toBuy.length && !data.completed.length) return;

  for (var i = 0; i < data.toBuy.length; i++) {
    var value = data.toBuy[i];
    addItemToHTML(value);
  }

  for (var j = 0; j < data.completed.length; j++) {
    var value = data.completed[j];
    addItemToHTML(value, true);
  }
};

// Add items to local storage
function addItemToLocalStorage() {
  localStorage.setItem("toBuyList", JSON.stringify(data))
}; 

// Remove item
function removeItem() {
  var item = this.parentNode.parentNode
  var parent = item.parentNode;
  var id = parent.id;
  var value = item.innerText;
  
  if(id === "toBuy") {
    data.toBuy.splice(data.toBuy.indexOf(value), 1);
  } else {
    data.completed.splice(data.completed.indexOf(value), 1);
  };
  addItemToLocalStorage();

  parent.removeChild(item);
};

// Complete item
function boughtItem() {
  var item = this.parentNode.parentNode;
  var parent = item.parentNode;
  var id = parent.id;
  var value = item.innerText;

  if(id === "toBuy") {
    data.toBuy.splice(data.toBuy.indexOf(value), 1);
    data.completed.push(value);
  } else {
    data.completed.splice(data.completed.indexOf(value), 1);
    data.toBuy.push(value);
  };
  addItemToLocalStorage();

  var target = (id === "toBuy") ? target = document.getElementById("completed") : document.getElementById("toBuy");

  parent.removeChild(item);
  target.insertBefore(item, target.childNodes[0]);
}

// Adds a new item to the items list
function addItemToHTML(text, completed) {
  var list = (completed) ? document.getElementById("completed") : document.getElementById("toBuy");

  var item = document.createElement("li");
  item.innerHTML = text;

  var buttons = document.createElement("div");
  buttons.classList.add("buttons");

  var remove = document.createElement("button");
  remove.classList.add("remove");
  remove.innerHTML = removeIcon;

  // Add click event for removing item 
  remove.addEventListener("click", removeItem)

  var complete = document.createElement("button");
  complete.classList.add("complete");
  complete.innerHTML = completeIcon;

  // Add click event for bought items 
  complete.addEventListener("click", boughtItem)

  buttons.appendChild(remove);
  buttons.appendChild(complete);
  item.appendChild(buttons);

  list.insertBefore(item, list.childNodes[0]);
}





// Show todays date
var dateElement = document.getElementById("date");
var options = { weekday:"long", month:"short", day:"numeric"}
var today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

// Clear all items 
var clear = document.querySelector("#clear_button");

clear.addEventListener("click", function() {
  localStorage.clear();
  location.reload();
});