let ctr = 0; 

function addTodo(button){
    const input = document.createElement("input");
    input.type = "text";
    input.id = "input-"+ctr;

    const save = document.createElement("button");
    save.innerHTML = "Save ToDo"
    save.onclick = function(){
        saveTodo(ctr,button);
        ctr+=1
    }

    const div = document.createElement("div");
    div.append(input);
    div.append(save);


    button.parentNode.querySelector(".todo-list").append(div)
    button.style.display = "none";
}

function saveTodo(num,button){
    const inputEle = document.getElementById("input-"+num);
    const value = inputEle.value;
    
    const h4 = document.createElement("h4");
    h4.innerText = value;
    h4.className = "todo-heading"
    h4.setAttribute("draggable",true);
    h4.id = "todo-item-"+num;
   
    const parentDiv =  inputEle.parentNode;
    parentDiv.replaceChildren(h4)

    button.style.display = "block"

    setupDragAndDrop();
    
}

function setupDragAndDrop() {
    const lists =  document.querySelectorAll(".todo-list");

    lists.forEach(list=>{
        list.addEventListener("dragover", function(e){
            e.preventDefault();
        })

        list.addEventListener("drop",function(e){
            const selected =  document.querySelector(".dragging");
            if(selected){
                list.appendChild(selected);
            }
        })
    })

    const todoItems = document.querySelectorAll(".todo-heading");

    todoItems.forEach((item)=>{
        item.addEventListener("dragstart",function(){
            item.classList.add("dragging")
        })

        item.addEventListener("dragend",function(){
            item.classList.remove("dragging")
        })
    })
}