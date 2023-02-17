const todoForm = document.querySelector('.todo-form');
const todoInput = document.querySelector('.todo-input');
const todoItem = document.querySelector('.todo-items'),
  allBtn = document.querySelector('.all-btn'),
  activeBtn = document.querySelector('.active-btn'),
  completeBtn = document.querySelector('.completed-btn'),
  clearBtn = document.querySelector('.clear-btn'),
  items = document.querySelector('.todo-result p');

const data = JSON.parse(localStorage.getItem('todoData'));
let collection = data ? data : [], editId = null, itemLeft;

const newList = () => {
  const obj = {
    todoname: todoInput.value,
    completed: null
  };
  if (editId === null) {
    collection.push(obj);
  } else {
    collection[editId] = obj;
    editId = null;
  }
  localStorage.setItem('todoData', JSON.stringify(collection));
  createList();
  todoInput.value = "";
}


const createList = () => {
  if (collection != null) {
    let li = '';
    collection.forEach((list) => {
      li += `<li class="todo-list ${list.completed == null ? '' : list.completed}">${list.todoname}</li>`;
    });
    todoItem.innerHTML = li;
    activeList();
    completedList();
    itemsCount();
  }
}

const itemsCount = () => {
  itemLeft = collection.filter((el) => { if (el.completed === null) { return el } });
  items.innerText = `${itemLeft.length} items left`;
}

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
  todoList.forEach((list, index) => {
    list.addEventListener('click', () => {
      editId = null;
      list.classList.remove('active');
      list.classList.add('completed');
      collection[index].completed = 'completed';
      localStorage.setItem('todoData', JSON.stringify(collection));
      itemsCount();
    });
  });
}

const activeList = () => {
  const todoList = document.querySelectorAll('.todo-list');
  todoList.forEach((list, index) => {
    list.addEventListener('dblclick', () => {
      list.classList.remove('completed');
      todoInput.value = list.innerText;
      editId = index;
      collection[editId].completed = null;
      localStorage.setItem('todoData', JSON.stringify(collection));
      itemsCount();
    });
  });
};

allBtn.addEventListener('click', () => {
  createList();
});

activeBtn.addEventListener('click', () => {
  const todoList = document.querySelectorAll('.todo-list');
  todoList.forEach((list) => {
    if (list.classList.contains('completed')) {
      list.classList.add('hide-list');
    } else {
      list.classList.remove('hide-list');
    }
  });
});

completeBtn.addEventListener('click', () => {
  const todoList = document.querySelectorAll('.todo-list');
  todoList.forEach((list) => {
    if (!list.classList.contains('completed')) {
      list.classList.add('hide-list');
    } else {
      list.classList.remove('hide-list');
    }
  });
});

clearBtn.addEventListener('click', () => {
  collection = itemLeft;
  localStorage.setItem('todoData', JSON.stringify(collection));
  createList();
});


// initial load
document.load = createList();



























