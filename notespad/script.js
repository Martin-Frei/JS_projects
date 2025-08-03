

function loadShoppingList() {
    let shoppingList = JSON.parse(localStorage.getItem("shoppingList")) || [];
    let tableBody = document.getElementById("outputSection"); 
    tableBody.innerHTML = "";

    for (let i = 0; i < shoppingList.length; i++) {
        tableBody.innerHTML += shoppingListTemplate(shoppingList[i], i);
    }
}

function shoppingListTemplate(item, index) {
    return `
        <tr>
            <td>${item.name}</td>
            <td>${item.store}</td>
            <td>${item.date}</td>
            <td class="delete-button"><button onclick="deleteItem(${index})">❌</button></td>
        </tr>
    `;
}

function addItem() {
    let inputName = document.getElementById("getName");
    let name = inputName.value.trim();

    let inputStore = document.getElementById("getStore");
    let store = inputStore.value.trim();

    let inputDate = document.getElementById("getDate");
    let date = inputDate.value;
}
    
function loadShoppingList() {
    let shoppingList = JSON.parse(localStorage.getItem("shoppingList")) || [];
    let tableBody = document.getElementById("outputSection"); 
    tableBody.innerHTML = "";

    for (let i = 0; i < shoppingList.length; i++) {
        tableBody.innerHTML += shoppingListTemplate(shoppingList[i], i);
    }
}

function shoppingListTemplate(item, index) {
    return `
        <tr>
            <td>${item.name}</td>
            <td>${item.store}</td>
            <td>${item.date}</td>
            <td class="delete-button"><button onclick="deleteItem(${index})">❌</button></td>
        </tr>
    `;
}

function addItem() {
    let inputName = document.getElementById("getName");
    let name = inputName.value.trim();

    let inputStore = document.getElementById("getStore");
    let store = inputStore.value.trim();

    let inputDate = document.getElementById("getDate");
    let date = inputDate.value;

    if (name === "" || store === "" || date === "") {
        alert("Bitte alle Felder ausfüllen!");
        return;
    }

    let shoppingList = JSON.parse(localStorage.getItem("shoppingList")) || [];
    shoppingList.push({ name, store, date });

    localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
    loadShoppingList();
    resetForm();
}

function deleteItem(index) {
    let shoppingList = JSON.parse(localStorage.getItem("shoppingList")) || [];
    shoppingList.splice(index, 1);

    localStorage.setItem("shoppingList", JSON.stringify(shoppingList));

    loadShoppingList(); 
    resetForm()
}

function checkEnter(event) {
    if (event.key === "Enter") {
        addItem();
    }
}

function editItem(index) {
    let shoppingList = JSON.parse(localStorage.getItem("shoppingList")) || [];
  
    let item = shoppingList[index];

    document.getElementById("getName").value = item.name;
    document.getElementById("getStore").value = item.store;
    document.getElementById("getDate").value = item.date;

    document.getElementById("saveButton").setAttribute("onclick", `saveEditedItem(${index})`);
}

function saveEditedItem(index) {
    let shoppingList = JSON.parse(localStorage.getItem("shoppingList")) || [];

    shoppingList[index] = {
        name: document.getElementById("getName").value,
        store: document.getElementById("getStore").value,
        date: document.getElementById("getDate").value
    };

    localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
    loadShoppingList(); 
    resetForm()
    document.getElementById("saveButton").setAttribute("onclick", "addItem()");
}

function resetForm() {
    document.getElementById("getName").value = "";
    document.getElementById("getStore").value = "";
    document.getElementById("getDate").value = "";
}


function deleteItem(index) {
    let shoppingList = JSON.parse(localStorage.getItem("shoppingList")) || [];
    shoppingList.splice(index, 1);

    localStorage.setItem("shoppingList", JSON.stringify(shoppingList));

    loadShoppingList(); 
    resetForm()
}

function checkEnter(event) {
    if (event.key === "Enter") {
        addItem();
    }
}

function editItem(index) {
    let shoppingList = JSON.parse(localStorage.getItem("shoppingList")) || [];
  
    let item = shoppingList[index];

    document.getElementById("getName").value = item.name;
    document.getElementById("getStore").value = item.store;
    document.getElementById("getDate").value = item.date;

    document.getElementById("saveButton").setAttribute("onclick", `saveEditedItem(${index})`);
}

function saveEditedItem(index) {
    let shoppingList = JSON.parse(localStorage.getItem("shoppingList")) || [];

    shoppingList[index] = {
        name: document.getElementById("getName").value,
        store: document.getElementById("getStore").value,
        date: document.getElementById("getDate").value
    };

    localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
    loadShoppingList(); 
    resetForm()
    document.getElementById("saveButton").setAttribute("onclick", "addItem()");
}

function resetForm() {
    document.getElementById("getName").value = "";
    document.getElementById("getStore").value = "";
    document.getElementById("getDate").value = "";
}

// function mainOn(){

// }
// function mainOff(){

// }

// function archievOn(){

// }

// function archievOff(){
    
// }