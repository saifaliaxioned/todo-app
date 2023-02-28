const todoForm = document.querySelector('.todo-form'),
  todoInput = document.querySelector('.todo-input'),
  todoItem = document.querySelector('.todo-items'),
  filterAll = document.querySelector('.all-btn'),
  filterActive = document.querySelector('.active-btn'),
  filterCompleted = document.querySelector('.completed-btn'),
  clearBtn = document.querySelector('.clear-btn'),
  items = document.querySelector('.todo-result p'),
  buttonList = document.querySelectorAll('.filter-list button'),
  activeBtn = document.querySelector('.active-filter');

const data = JSON.parse(localStorage.getItem('todoData'));
let collection = data ? data : [], editId = null, itemLeft;

const newList = () => {
  const obj = { todoname: todoInput.value, completed: null };
  editId == null ? collection.push(obj) : collection[editId] = obj;
  editId = null;
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
    completeList();
    itemsCount();
  }
};

const setActive = (btn) => {
  const activeBtn = document.querySelector('.active-filter');
  activeBtn.classList.remove('active-filter');
  btn.classList.add('active-filter');
}

const itemsCount = () => {
  itemLeft = collection.filter((el) => { if (el.completed === null) { return el } });
  items.innerText = `${itemLeft.length} items left`;
}

todoForm.addEventListener('submit', (e) => {
  e.preventDefault();
});

todoInput.addEventListener('keyup', (e) => {
  if (e.key == 'Enter' && todoInput.value) {
    newList();
    setActive(filterAll);
  }
});

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
    })
  })
};

const completeList = () => {
  const todoList = document.querySelectorAll('.todo-list');
  todoList.forEach((list, index) => {
    list.addEventListener('click', () => {
      editId = null;
      list.classList.remove('active');
      list.classList.add('completed');
      collection[index].completed = 'completed';
      localStorage.setItem('todoData', JSON.stringify(collection));
      itemsCount();
    })
  })
};

filterAll.addEventListener('click', () => {
  setActive(filterAll);
  createList();
});

filterActive.addEventListener('click', () => {
  setActive(filterActive);
  const todoList = document.querySelectorAll('.todo-list');
  todoList.forEach((list) => {
    if (list.classList.contains('completed')) {
      list.classList.add('hide-list');
    } else {
      list.classList.remove('hide-list');
    }
  });
});

filterCompleted.addEventListener('click', () => {
  setActive(filterCompleted);
  const todoList = document.querySelectorAll('.todo-list');
  todoList.forEach((list) => {
    if (!list.classList.contains('completed')) {
      list.classList.add('hide-list');
    } else {
      list.classList.remove('hide-list');
    }
  })
});

clearBtn.addEventListener('click', () => {
  setActive(filterAll);
  collection = itemLeft;
  localStorage.setItem('todoData', JSON.stringify(collection));
  createList();
});

// initial load
document.load = createList();