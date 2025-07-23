var listCount = 0;
myDiv = document.getElementById('main-grid-space');
addedLists = document.getElementById('second-flex');
const testButton = document.getElementById("test-button")
var item_input="";



class ToDoList {
    constructor(id, idNumber){
        this.id = id;
        this.idNumber = idNumber;
        this.todos = getFromLocalStorage(this.idNumber);
        // this.item_input;
        this.input_open=1;
    }

    
    deleteAllItems(){
        this.todos=[];
        this.updateList(this.idNumber);
        addToLocalStorage(this.idNumber);
    }
    
    addItem(to_do_task){
        const todo = {
            name: to_do_task,
            completed: false
        };
        this.todos.push(todo);
        this.updateList(this.idNumber);
        addToLocalStorage(this.idNumber);
        item_input.value= ""; 
    }


    updateList(listNum){
        var list = document.getElementById("list-"+listNum);
        list.innerHTML = "";
        this.todos.forEach((todo, todoIndex) => {
            const todoID = todoIndex;
            var listItem = document.createElement("li");
            listItem.setAttribute('list_id', listNum);
            listItem.setAttribute('todo_id', todoID);
            var check = document.createElement("input");
            check.type = "checkbox";
            check.name = "to-do-check";
            if (todo.completed == true){
                check.checked = true;
            } else if (todo.completed == false){
                check.checked = false;
            }

            //add text
            var textNode = document.createTextNode(todo.name);

            // //add delete dash
            var span = document.createElement("span");
            span.innerHTML = "&#x2013";

            //append everything to the list item
            listItem.appendChild(check);
            listItem.appendChild(span);
            listItem.appendChild(textNode);

            //append the list item to the list
            list.appendChild(listItem);

        })

       
    }

    toggleCheck(name) {
        this.todos.forEach((todo, todoIndex) => {
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
        addToLocalStorage(this.idNumber);
        this.updateList(this.idNumber);
    }


    resetCompletes() {
        this.todos.forEach((todo) => {
            todo.completed = false;
        })
        addToLocalStorage(this.idNumber);
        this.updateList(this.idNumber);
    }
     
}

//create all instances of to do lists - application can use up to nine lists
const list0 = new ToDoList('list-0', 0);
const list1 = new ToDoList('list-1', 1);
const list2 = new ToDoList('list-2', 2);
const list3 = new ToDoList('list-3', 3);
const list4 = new ToDoList('list-4', 4);
const list5 = new ToDoList('list-5', 5);
const list6 = new ToDoList('list-6', 6);
const list7 = new ToDoList('list-7', 7);
const list8 = new ToDoList('list-8', 8);

listofLists = [list0, list1, list2, list3, list4, list5, list6, list7, list8];

//loading the page when it first opens
list0.todos=getFromLocalStorage(list0.idNumber);
list0.updateList(list0.idNumber);
let last_full_list = 0;
for (let i=1; i < listofLists.length; i++) {
    listofLists[i].todos = getFromLocalStorage(listofLists[i].idNumber);
    if (getNameLocalStorage(i) == ""){
        addNameLocalStorage(i, `List ${i}`);
    }
    
    if (listofLists[i].todos.length != 0){  
        for (let j = (last_full_list+1); j<i; j++){
            if(listofLists[j].todos.length == 0){
                createGrid();
            }
        }
        createGrid();
        listofLists[i].updateList(listofLists[i].idNumber);
        last_full_list = i;
    } else  if (listofLists[i].todos.length == 0){
        continue;
    }
    
}

//local storage functions
function addToLocalStorage(idNum){
    localStorage.setItem('todo-list-'+idNum, JSON.stringify(current_list.todos));
    
}

function getFromLocalStorage(idNum){
    const todos = localStorage.getItem('todo-list-'+idNum) || '[]';
    return JSON.parse(todos);
}

function addNameLocalStorage(idNum, listname){
    localStorage.setItem('todo-list-'+idNum+'-name', listname);
}


function getNameLocalStorage(idNum){
    const listname = localStorage.getItem('todo-list-'+idNum+'-name') || "";
    return listname;
}


//function to add new to do list
newGrid = document.getElementById("plus-grid");
newGrid.addEventListener("click", (event) => {
    if (listCount<8){
        createGrid();
    }
})

function createGrid(){
    listCount=listCount+1;
    current_list_get = listofLists[listCount];
    list_title = getNameLocalStorage(current_list_get.idNumber);
    addedLists.insertAdjacentHTML('beforeend', 
        `<div class="list" id="container-${listCount}">
            <div id="list-header-${listCount}">
                <h3 id="list-title-${listCount}">${list_title}</h3>
                <div id="list-options-${listCount}">
                    <img src="images/garbage.jpg" id="delete-grid-${listCount}">
                    <img src="images/refresh.png" id="reset-grid-${listCount}">
                    <img src="images/plus.png" id="plus-item-${listCount}">  
                </div> 
            </div>
                <ul id="list-${listCount}">
                </ul>  
                <div id = "item-entry-${listCount}">
                    <input type="checkbox" id="entry-check-${listCount}">
                    <input type="text" id="entry-text-${listCount}" autocomplete="off">
                </div>
        </div>`
    );
}

//functions to handle any click inside of the to do lists
myDiv.addEventListener('click', function(e) {
    var clickedID = e.target.id;
    var clickedParentID = e.target.parentElement.id;
    listofLists.forEach(element => {
        if (clickedID.includes(element.idNumber)){
            current_list = element;
            item_entry = document.getElementById("item-entry-"+current_list.idNumber);
        } else if (e.target.tagName=="SPAN" || (e.target.tagName=="INPUT" && e.target.type=="checkbox")){
            if (e.target.parentElement.getAttribute('list_id').includes(element.idNumber)){
                current_list = element;
            }
        }
    });


    if (e.target.tagName == "H3"){
        if (e.target.innerHTML != "Main"){
            current_header=document.getElementById("list-title-"+current_list.idNumber);
            current_header.innerHTML="";
            current_header.innerHTML= `<input id="temp_list_name-${current_list.idNumber}" type="text" autocomplete="off" placeholder="List Name" autofocus></input>`;
            new_name_entry=document.getElementById("temp_list_name-"+current_list.idNumber);
            new_name_entry.addEventListener("keydown", function(e) {
                if (e.key == "Enter") {
                    new_name=new_name_entry.value;
                    current_header.innerHTML="";
                    current_header.innerHTML=`<h3> ${new_name} </h3>`;
                    addNameLocalStorage(current_list.idNumber, new_name);
                    new_name_entry.style.display="none";
                }   
            })
        }
    }
    if (e.target.tagName == 'IMG'){
        //if the image clicked is the plus sign
        if (e.target.src.includes('images/plus.png')){
            if (current_list.input_open == 0){
                item_entry.style.display="block";
                current_list.input_open=1;
            }else if (current_list.input_open == 1){
            }
        }
        //if the image clicked is the garbage sign 
        else if (e.target.src.includes('images/garbage.jpg')){
            current_list.deleteAllItems();

        //if the image clicked is the refresh sign 
        }else if (e.target.src.includes('images/refresh.png')){
            current_list.resetCompletes();
        }
    }
    //if the click was inside of the text box for entering a to do item
    else if ((e.target.id.includes('entry-text'))){
        item_input = e.target;
        item_input.removeEventListener("keydown", handleEnter);
        item_input.addEventListener("keydown", handleEnter) 
    } 
    else if (e.target.tagName == "SPAN"){
        e.target.parentElement.remove();
        current_list.todos.splice(e.target.parentElement.id, 1);
        addToLocalStorage(current_list.idNumber);
        current_list.updateList(current_list.idNumber);
    } 
    else if (e.target.type == "checkbox"){
        current_list.toggleCheck(e.target.parentElement.getAttribute('todo_id'));
    }
});

function handleEnter(e){
    
    if (e.key == "Enter") {
        if (item_input.value == ""){
            alert('To do item is empty!');
        }
        else if (item_input.value != ""){
            current_list.addItem(item_input.value);
        }                                        
    }
    else if (e.key == "Escape") {
        item_entry.style.display="none";
        current_list.input_open=0;
        to_do_task = "";
    }
}


