const form = document.getElementById("form");
const input = document.getElementById("input");
const todos = document.getElementById("todos");

const todoLS = JSON.parse(localStorage.getItem("todos"));

//todo is the item in the Local Storage that we are attempting to display consistently.
//Note: this is different from the todoText which is the newly submited todo
if (todoLS) {
  todoLS.forEach((todo) => {
    addTodo(todo);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  addTodo();
});

//function to add a new todo - todoText.
function addTodo(todo) {
  //here, we are declaring the value of the input todo
  let todoText = input.value;

  // this block of code is trying to bring ensure both new and old todo have the same variable name - which is todoText
  if (todo) {
    todoText = todo.text;
  }
  //so paradventure, another todo is submited then an 'li' ought to be created
  if (todoText) {
    const todoEl = document.createElement("li");

    //maintain the toggle completed - i.e. adding the css rules
    if (todo && todo.completed) {
      todoEl.classList.add("done");
    }

    // appenhending the created 'li' to the DOM
    todoEl.innerText = todoText;
    todos.appendChild(todoEl);
    input.value = "";

    updateLS();
    //toggle when done.
    todoEl.addEventListener("click", () => {
      todoEl.classList.toggle("done");
      updateLS();
    });
    //remove or delete
    todoEl.addEventListener("contextmenu", (e) => {
      e.preventDefault();

      todoEl.remove();
      updateLS();
    });
  }
}
// the function is responsible for selecting the content of the todo and to store it in a local storage. The data structure used is the array data structure.
function updateLS() {
  const notesEl = document.querySelectorAll("li"); //to store the todo - the queryselector is used to pick all the content 'li' which contains.
  const todos = []; //The array that stores all the todos: it saves the text and also it's status: done or not.
  //The selected todos are iterated and pushed into the array
  notesEl.forEach((noteEl) => {
    todos.push({
      text: noteEl.innerText,
      completed: noteEl.classList.contains("done"),
    });
  });
  //stringify is used to conver the array into object
  localStorage.setItem("todos", JSON.stringify(todos));
}
