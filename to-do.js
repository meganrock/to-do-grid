const newItem = document.getElementById("plus-item");
const newGrid = document.getElementById("plus-grid");
const container = document.getElementById("container");
const item_entry = document.getElementById("item-entry");
const item_input = document.getElementById("entry-text");
const list = document.getElementById("main-list");

var input_open = 0;
let todos = [];


newItem.addEventListener("click", (event) => { 
    if (input_open == 0){
        item_entry.style.display="block";
        input_open=1;
    }
})

item_input.addEventListener("keyup", function(e) {
    if (e.key == "Enter") {
        if (item_input.value == ""){
            alert('To do item is empty!');
        }
        else if (item_input.value != ""){
            addItem(item_input.value);
            displayItem(item_input.value);
        }                                        
    }
    else if (e.key == "Escape") {
        item_entry.style.display="none";
        input_open=0;
        to_do_task = "";
    }
});

//functions for what to do if anything in the to do list is clicked
list.addEventListener("click", function(e){
    if(e.target.tagName == "LI"){
        //stuff about drag and drop ?
    }
    else if (e.target.tagName == "SPAN"){
        e.target.parentElement.remove();
    }
    else if (e.target.type == "checkbox"){
        toggleCheck();
    }
})

//this function creates the to do item and stores it to local storage
function addItem(to_do_task){
    //add this to do task to the to do array
    const todo = {
        id: Date.now,
        name: to_do_task,
        completed: false
    };
    todos.push(todo);
    console.log(todos);
    addToLocalStorage(todos);
}

//this function adds the to do item to the web page
function displayItem(to_do_task){
    var list_item = document.createElement("li");
    
    //add checkbox
    var check = document.createElement("input");
    check.type = "checkbox";
    check.className = "checkboxes"
    check.addEventListener("change", toggleCheck());

    //add text
    var textNode = document.createTextNode(to_do_task);

    //add delete dash
    span = document.createElement("span");
    span.innerHTML = "&#x2013";

    //append everything to the list item
    list_item.appendChild(check);
    list_item.appendChild(span);
    list_item.appendChild(textNode);

    //append the list item to the list
    list.appendChild(list_item);

    //clear the input bar
    item_input.value = ""; 
}


function toggleCheck(name) {
    todos.forEach(function(item) {
        if (item.name == name) {
            item.completed = !item.completed;
        }
    });
    addToLocalStorage(todos);
}


//local storage functions
function addToLocalStorage(todos){
    localStorage.setItem('todos', JSON.stringify(todos));

}

function getFromLocalStorage(){
    const reference = localStorage.getItem('todos');
    if (reference){
        todos = JSON.parse(reference);
    }
}



//FOR ADDING NEW GRIDS

//event listener to add a new to do grid (new list)
newGrid.addEventListener("click", (event) => { 
    createGrid();
})

function createGrid(){
    console.log("new grid!")
}








//references and guides I used
//https://thecodingpie.medium.com/how-to-build-a-todo-list-app-with-javascript-and-local-storage-a884f4ea3ec

