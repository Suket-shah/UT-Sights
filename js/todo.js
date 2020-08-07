const todoInput = document.querySelector('#todo-input');
const todoCompleteList = document.querySelector('.todo-complete-list');
const doneCompleteList = document.querySelector('.done-complete-list');
const trashIcon = document.querySelector('.fa-trash');
const todoCaption = document.querySelector('.todo-caption');
const todoComplete = document.querySelector('.todo-complete');

function removeAllTodo(todoType = 'todo') {
  let allItems = document.querySelectorAll(`.${todoType}-item`);
  allItems.forEach((val, index) => {
    val.remove();
  });
}

function populateTodo(todoType = 'todo', listType = todoCompleteList) {
  const items = localStorage.getItem(todoType);
  if (items !== null) {
    const itemsArr = JSON.parse(items);
    itemsArr.forEach((val, index) => {
      //   let currItem = document.createElement('p');
      //   currItem.className = `${todoType}-item`;
      //   currItem.innerHTML = val;
      listType.insertAdjacentHTML(
        'beforeend',
        `<p class="${todoType}-item" id="item${index}">${val}</p>`
      );
    });
  }
}

todoCaption.addEventListener('click', (e) => {
  if (todoComplete.classList.contains('hidden')) {
    todoComplete.classList.remove('hidden');
  } else {
    todoComplete.classList.add('hidden');
  }
});

//TODO limit on how long a todo item can be (150 chars)
todoInput.addEventListener('keyup', (e) => {
  if (e.keyCode === 13 && localStorage.getItem('todo') !== null) {
    let val = todoInput.value;
    todoInput.value = '';
    let newList = JSON.parse(localStorage.getItem('todo'));
    newList.push(val);
    removeAllTodo();
    localStorage.setItem('todo', JSON.stringify(newList));
    populateTodo();
  } else if (e.keyCode === 13) {
    let val = todoInput.value;
    let newList = [val];
    todoInput.value = '';
    removeAllTodo();
    localStorage.setItem('todo', JSON.stringify(newList));
    populateTodo();
  }
});

//event delegation for deleting items
todoCompleteList.addEventListener('click', (e) => {
  let target = e.target;
  let todoArr = JSON.parse(localStorage.getItem('todo'));
  todoArr.splice(target.id.split('item')[1], 1);
  localStorage.setItem('todo', JSON.stringify(todoArr));
  removeAllTodo();
  populateTodo();
  addToCompleted(target);
});

doneCompleteList.addEventListener('click', (e) => {
  let target = e.target;
  let doneArr = JSON.parse(localStorage.getItem('done'));
  doneArr.splice(target.id.split('item')[1], 1);
  localStorage.setItem('done', JSON.stringify(doneArr));
  removeAllTodo('done');
  populateTodo('done', doneCompleteList);
  let todoArr = JSON.parse(localStorage.getItem('todo'));
  todoArr.push(target.textContent);
  localStorage.setItem('todo', JSON.stringify(todoArr));
  removeAllTodo();
  populateTodo();
  // Style decision to not delete title with empty list this way
  // if (doneArr.length === 0) {
  //   document.querySelector('.done-title-trash').classList.add('hidden');
  // }
});

trashIcon.addEventListener('click', (e) => {
  localStorage.setItem('done', JSON.stringify([]));
  removeAllTodo('done');
  document.querySelector('.done-title-trash').classList.add('hidden');
});

function addToCompleted(target) {
  target = target.textContent;
  let newList;
  let totalDone = document.querySelector('.done-title-trash');
  totalDone.classList.remove('hidden');
  if (localStorage.getItem('done') !== null) {
    newList = JSON.parse(localStorage.getItem('done'));
    newList.push(target);
    removeAllTodo('done');
  } else {
    newList = [target];
  }
  localStorage.setItem('done', JSON.stringify(newList));
  populateTodo('done', doneCompleteList);
}

function initComplete() {
  let items = localStorage.getItem('done');
  if (items !== null && JSON.parse(items).length !== 0) {
    items = JSON.parse(items);
    items.forEach((val, index) => {
      //   let currItem = document.createElement('p');
      //   currItem.className = `${todoType}-item`;
      //   currItem.innerHTML = val;
      doneCompleteList.insertAdjacentHTML(
        'beforeend',
        `<p class="done-item" id="item${index}">${val}</p>`
      );
    });
  } else {
    document.querySelector('.done-title-trash').classList.add('hidden');
  }
}

populateTodo();
initComplete();
