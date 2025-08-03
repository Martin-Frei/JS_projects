
function renderShowList(){
    let shoppingList =JSON.parse(localStorage.getItem("shoppingList")) || [];
    let tableBody = document.getElementById("tableBodyOutput");
    tableBody.innerHTML ="";
    showList()

    for (let i = 0; i < shoppingList.length; i++){
        tableBody.innerHTML += shoppingListTemplate(shoppingList[i],i);
    }
}

function shoppingListTemplate(item, index){
    return `
    <tr>
        <td>${item.name}</td>
        <td>${item.store}</td>
        <td class="archiev-button"><button onclick="moveItem(${index})">➡️ Archiev</button></td>
    </tr>`
}

function addItem() {
    let inputName = document.getElementById("inputName");
    let name = inputName.value.trim();

    let inputStore = document.getElementById("inputStore");
    let store = inputStore.value.trim();

    if (name === "" || store === "") {
        alert("Bitte alle Felder ausfüllen!");
        return;
    }

    let shoppingList = JSON.parse(localStorage.getItem("shoppingList")) || [];
    shoppingList.push({ name, store });

    localStorage.setItem("shoppingList", JSON.stringify(shoppingList));

    renderShowList();
    resetForm();
}


function moveItem(index){
    let shoppingList = JSON.parse(localStorage.getItem("shoppingList")) || [];
    let archievList = JSON.parse(localStorage.getItem("archievList")) || [];

    let item = shoppingList.splice(index,1)[0];
    archievList.push(item);

    localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
    localStorage.setItem("archievList", JSON.stringify(archievList));
    renderShowList();
}

function resetForm(){
    document.getElementById("inputName").value = "";
    document.getElementById("inputStore").value = "";

    document.getElementById("inputName").focus();
}

function showList(){
    document.getElementById("main").classList.remove("d-none");
    document.getElementById("archievSection").classList.add("d-none");
}
 function showArchiev(){
    document.getElementById("main").classList.add("d-none");
    document.getElementById("archievSection").classList.remove("d-none");
 }

 function checkEnter(event) {
    if (event.key === "Enter") {
        addItem();
        document.getElementById("inputName").focus();
    }
}

 function renderShowArchiev(){
    let archievList =JSON.parse(localStorage.getItem("archievList")) || [];
    let tableBody = document.getElementById("tableBodyArchiev");
    tableBody.innerHTML ="";
    showArchiev()

    for (let i = 0; i < archievList.length; i++){
        tableBody.innerHTML += archievListTemplate(archievList[i],i);
    }
}

function archievListTemplate(item, index){
    return  `
    <tr>
        <td>${item.name}</td>
        <td>${item.store}</td>
        <td class="archiev-button"><button onclick="backToList(${index})">➡️ Back to List</button><button onclick="deleteItem(${index})">🗑️ Trash</button></td>
    </tr>`
}

function backToList(index){
    let shoppingList = JSON.parse(localStorage.getItem("shoppingList")) || [];
    let archievList = JSON.parse(localStorage.getItem("archievList")) || [];

    let item = archievList.splice(index,1)[0];
    shoppingList.push(item);

    localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
    localStorage.setItem("archievList", JSON.stringify(archievList));
    renderShowArchiev();
}

function deleteItem(index){
    let archievList = JSON.parse(localStorage.getItem("archievList")) || [];
    archievList.splice(index,1);

    localStorage.setItem("archievList", JSON.stringify(archievList));
    renderShowArchiev();
}