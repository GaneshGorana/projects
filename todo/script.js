let todoInput = document.querySelector(".todo-input");

let todoSet = document.getElementById("todoSet");

let todoList = document.querySelector(".todo-list");

todoSet.addEventListener("click", (e) => {
  e.preventDefault();
  let todoData = todoInput.value;
  if (todoData.trim() !== "") {
    todoInput.value = "";
    let newLi = document.createElement("li");
    newLi.innerHTML = `
          <span class="todoText">
                    <i class="circle"></i>
                    ${todoData}
      </span><div class = "buttons">
      <button class="todo-done">DONE</button>
      <button class = "todo-remove">REMOVE</button>
      </div>`;
    todoList.append(newLi);
  } else {
    todoInput.value = "";
    todoInput.placeholder = "Invalid ToDo Input...";
    todoInput.classList.add("invalid");

    todoInput.addEventListener("focus", () => {
      todoInput.classList.remove("invalid");
      todoInput.placeholder = "Add ToDo...";
    });
  }
});

todoList.addEventListener("click", (event) => {
  if (event.target.classList.contains("todo-done")) {
    let span = event.target.parentNode.previousElementSibling;
    span.style.textDecoration = "line-through";
  }
  if (event.target.classList.contains("todo-remove")) {
    let child = event.target.parentNode.parentNode;
    todoList.removeChild(child);
  }
});
