(function () {
  let arrayTodo = [],
    localName = '';

  function createAppTitle(title) {
    const appTitle = document.createElement('h2');
    appTitle.innerHTML = title;
    return appTitle;
  }

  function createTodoItemForm() {
    const form = document.createElement('form');
    const input = document.createElement('input');
    const buttonWrapper = document.createElement('div');
    const button = document.createElement('button');

    form.classList.add('input-group', 'mb-3');
    input.classList.add('form-control');
    input.placeholder = 'Введите название нового дела';
    buttonWrapper.classList.add('input-group-append');
    button.classList.add('btn', 'btn-primary');
    button.textContent = 'Добавить дело';

    buttonWrapper.append(button);
    form.append(input, buttonWrapper);

    button.disabled = true;

    form.addEventListener('input', () => {
      button.disabled = false;

      if (input.value.length === 0) {
        button.disabled = true;
      }
    })

    return {
      form,
      input,
      button,
    };
  }

  function createTodoList() {
    const list = document.createElement('ul');
    list.classList.add('list-group');
    return list;
  }

  function createTodoItem(objectItem) {
    const item = document.createElement('li');
    const buttonGroup = document.createElement('div');
    const doneButton = document.createElement('button');
    const deleteButton = document.createElement('button');

    item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    item.textContent = objectItem.name;

    buttonGroup.classList.add('btn-group', 'btn-group-sm');
    doneButton.classList.add('btn', 'btn-success');
    doneButton.textContent = 'Готово';
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.textContent = 'Удалить';

    buttonGroup.append(doneButton, deleteButton);
    item.append(buttonGroup);

    if (objectItem.done == true) item.classList.add('list-group-item-success');

    doneButton.addEventListener('click', () => {
      item.classList.toggle('list-group-item-success');

      for (const listItem of arrayTodo) {
        if (objectItem.id == listItem.id) {
          listItem.done = !listItem.done;

          saveLocalStorage(localName, JSON.stringify(arrayTodo));
        }
      }
    });

    deleteButton.addEventListener('click', () => {
      if (confirm('Вы уверены?')) {
        item.remove();

        const index = arrayTodo.findIndex(n => n.id === objectItem.id);

        if (index !== -1) {
          arrayTodo.splice(index, 1);
        }

        saveLocalStorage(localName, JSON.stringify(arrayTodo));
      }
    })

    return {
      item,
      doneButton,
      deleteButton,
    };
  }

  function saveLocalStorage(key, value) {
    localStorage.setItem(key, value);
  }

  function createTodoApp(container, title = 'Список дел', listName) {
    const todoAppTitle = createAppTitle(title);
    const todoItemForm = createTodoItemForm();
    const todoList = createTodoList();

    localName = listName;

    container.append(todoAppTitle, todoItemForm.form, todoList);

    let localData = localStorage.getItem(listName);

    if (localData !== null && localData !== '') arrayTodo = JSON.parse(localData);

    for (const itemList of arrayTodo) {
      let newItem = createTodoItem(itemList);

      todoList.append(newItem.item);
    }

    todoItemForm.form.addEventListener('submit', (e) => {
      e.preventDefault();

      const inputValue = todoItemForm.input.value;
      const randomId = Math.floor(Math.random() * 99) + 10;

      if (!inputValue) {
        return;
      }

      let newItem = { id: randomId, name: inputValue, done: false };

      let todoItem = createTodoItem(newItem);

      todoList.append(todoItem.item);
      arrayTodo.push(newItem);

      saveLocalStorage(listName, JSON.stringify(arrayTodo));

      todoItemForm.button.disabled = true;

      todoItemForm.input.value = '';
    })
  }

  window.createTodoApp = createTodoApp;
})();