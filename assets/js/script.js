const todoForm = document.querySelector('.todo-form'),
  todoInput = document.querySelector('.todo-input'),
  todoItem = document.querySelector('.todo-items'),
  allBtn = document.querySelector('.all-btn'),
  activeBtn = document.querySelector('.active-btn'),
  completeBtn = document.querySelector('.completed-btn'),
  clearBtn = document.querySelector('.clear-btn'),
  items = document.querySelector('.todo-result p');

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
    listClickEvent('click');
    listClickEvent('dblclick');
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
  if (e.key == 'Enter' && todoInput.value) {
    newList();
  }
});

const listClickEvent = (btnEvent) => {
  const todoList = document.querySelectorAll('.todo-list');
  todoList.forEach((list, index) => {
    list.addEventListener(btnEvent, () => {
      if (btnEvent === 'click') {
        editId = null;
        list.classList.remove('active');
        list.classList.add('completed');
        collection[index].completed = 'completed';
      } else {
        list.classList.remove('completed');
        todoInput.value = list.innerText;
        editId = index;
        collection[editId].completed = null;
      }
      localStorage.setItem('todoData', JSON.stringify(collection));
      itemsCount();
    });
  });
}

const clickEvent = (btn, btnEvent) => {
  btn.addEventListener(btnEvent, () => {
    const activeBtn  = document.querySelector('.active-filter');
    if (activeBtn) {
      activeBtn.classList.remove('active-filter');
    }
    btn.classList.add('active-filter');
    const todoList = document.querySelectorAll('.todo-list');
    todoList.forEach((list) => {
      if (btn.classList.contains('all-btn')) {
        createList();
      } else if (btn.classList.contains('active-btn')) {
        if (list.classList.contains('completed')) {
          list.classList.add('hide-list');
        } else {
          list.classList.remove('hide-list');
        }
      } else {
        if (!list.classList.contains('completed')) {
          list.classList.add('hide-list');
        } else {
          list.classList.remove('hide-list');
        }
      }
    });
  });
};

clickEvent(allBtn, 'click');
clickEvent(activeBtn, 'click');
clickEvent(completeBtn, 'click');

clearBtn.addEventListener('click', () => {
  collection = itemLeft;
  localStorage.setItem('todoData', JSON.stringify(collection));
  createList();
});

// initial load
document.load = createList();