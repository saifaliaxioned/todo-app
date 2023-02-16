const todoForm = document.querySelector('.todo-form');
const todoInput = document.querySelector('.todo-input');
const todoItem = document.querySelector('.todo-items');

const data = JSON.parse(localStorage.getItem('todoData'));
let collection = data ? data : [];

const newList = () => {
  const obj = {
    todoname: todoInput.value
  };
  collection.push(obj);
  localStorage.setItem('todoData', JSON.stringify(collection));
  createList();
  todoInput.value = "";
}


const createList = () => {
  if (collection != null) {
    let li = '';
    collection.forEach((list) => {
      li += `<li class="todo-list">${list.todoname}</li>`;
    });
    todoItem.innerHTML = li;
    activeList();
    completedList();
  }
}

console.log(collection.length);
todoForm.addEventListener('submit', (e) => {
  e.preventDefault();
});

todoInput.addEventListener('keyup', (e) => {
  if (e.key == 'Enter') {
    newList();
  }
});


const completedList = () => {
  const todoList = document.querySelectorAll('.todo-list');
  todoList.forEach((list) => {
    list.addEventListener('click', () => {
      list.classList.add('completed-list');
    });
  })
}

const activeList = () => {
  const todoList = document.querySelectorAll('.todo-list');
  todoList.forEach((list) => {
    list.addEventListener('dblclick', () => {
      list.classList.remove('completed-list');
      todoInput.value = list.innerText;
      console.log('kdf');
    });
  })
}

// initial load
document.load = createList();


























