let ctr = 0; 

function addTodo(button) {
    const input = document.createElement("input");
    input.type = "text";
    input.id = "input-" + ctr;

    const save = document.createElement("button");
    save.innerHTML = "Save ToDo";
    save.onclick = function () {
        saveTodo(ctr, button);
        ctr += 1;
    };

    const div = document.createElement("div");
    div.append(input);
    div.append(save);

    button.parentNode.querySelector(".todo-list").append(div);
    button.style.display = "none";
}

function saveTodo(num, button) {
    const inputEle = document.getElementById("input-" + num);
    const value = inputEle.value;

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "Delete";
    deleteBtn.setAttribute("onclick", "deleteTodo(this)");

    const h4 = document.createElement("h4");
    h4.innerText = value;
    h4.className = "todo-heading";

    // Create a container for both h4 and the delete button
    const todoContainer = document.createElement("div");
    todoContainer.className = "todo-container";
    todoContainer.id = "todo-item-" + num;
    todoContainer.setAttribute("draggable", true);

    todoContainer.appendChild(h4);
    todoContainer.appendChild(deleteBtn);

    const parentDiv = inputEle.parentNode;
    parentDiv.replaceChildren(todoContainer);

    button.style.display = "block";

    setupDragAndDrop();
}

function deleteTodo(button) {
    button.parentNode.remove();
}

function setupDragAndDrop() {
    const lists = document.querySelectorAll(".todo-list");

    lists.forEach((list) => {
        list.addEventListener("dragover", function (e) {
            e.preventDefault();
        });

        list.addEventListener("drop", function (e) {
            const selected = document.querySelector(".dragging");
            if (selected) {
                list.appendChild(selected);
            }
        });
    });

    const todoItems = document.querySelectorAll(".todo-container");

    todoItems.forEach((item) => {
        item.addEventListener("dragstart", function () {
            item.classList.add("dragging");
        });

        item.addEventListener("dragend", function () {
            item.classList.remove("dragging");
        });
    });
}
