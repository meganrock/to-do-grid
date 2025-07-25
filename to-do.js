const newItem = document.getElementById("plus-item-0");
const newGrid = document.getElementById("plus-grid");
const container = document.getElementById("container-0");
const item_entry = document.getElementById("item-entry-0");
const item_input = document.getElementById("entry-text-0");
const listReset = document.getElementById("reset-grid-0");
const deleteGrid = document.getElementById("delete-grid-0");
const list = document.getElementById("list-0");
const testButton = document.getElementById("test-button")

var input_open = 0;
let todos = getFromLocalStorage();
updateList();


newItem.addEventListener("click", (event) => { 
    if (input_open == 0){
        item_entry.style.display="block";
        input_open=1;
    }
})

testButton.addEventListener("click", printToDos);

function printToDos(){
    console.log(todos);
}

listReset.addEventListener("click", resetCompletes);
deleteGrid.addEventListener("click", deleteAllItems);

item_input.addEventListener("keyup", function(e) {
    if (e.key == "Enter") {
        if (item_input.value == ""){
            alert('To do item is empty!');
        }
        else if (item_input.value != ""){
            addItem(item_input.value);
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
        console.log(e.target.parentElement);
        todos.splice(e.target.parentElement.id, 1);
        addToLocalStorage();
        updateList();
    }
    else if (e.target.type == "checkbox"){
        console.log('parent element id: ' + e.target.parentElement.id);
        toggleCheck(e.target.parentElement.id);
    }
})

//this function creates the to do item and stores it to local storage
function addItem(to_do_task){
    const todo = {
        name: to_do_task,
        completed: false
    };
    todos.push(todo);
    updateList();
    console.log(todos);
    addToLocalStorage();
    item_input.value = ""; 
}


function updateList(){
    list.innerHTML = "";
    todos.forEach((todo, todoIndex) => {
        const todoID = todoIndex;
        var listItem = document.createElement("li");
        listItem.setAttribute('id', todoID);
        var check = document.createElement("input");
        check.type = "checkbox";
        if (todo.completed == true){
            check.checked = true;
        }

        //add text
        var textNode = document.createTextNode(todo.name);

        //add delete dash
        span = document.createElement("span");
        span.innerHTML = "&#x2013";

        //append everything to the list item
        listItem.appendChild(check);
        listItem.appendChild(span);
        listItem.appendChild(textNode);

        //append the list item to the list
        list.appendChild(listItem);
    })

}


function toggleCheck(name) {
    todos.forEach((todo, todoIndex) => {
        if (todo.completed == false) {
            if (name == todoIndex){
                todo.completed = true;
            }
        }else if (todo.completed == true) {
        if (name == todoIndex){
            todo.completed = false;
        }
    }
    })
    addToLocalStorage();
    updateList();
}

function resetCompletes() {
    console.log('reset');
    todos.forEach((todo, todoIndex) => {
        todo.completed = false;
    })
    addToLocalStorage();
    updateList();
}

function deleteAllItems(){
    todos=[];
    addToLocalStorage();
    updateList();
}

//local storage functions
function addToLocalStorage(){
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getFromLocalStorage(){
    const todos = localStorage.getItem('todos') || '[]';
    return JSON.parse(todos);
}


//event listener to add a new to do grid (new list)
newGrid.addEventListener("click", (event) => { 
    createGrid();
})

function createGrid(){
    console.log("new grid!")
}





//references and guides I used
//https://thecodingpie.medium.com/how-to-build-a-todo-list-app-with-javascript-and-local-storage-a884f4ea3ec

