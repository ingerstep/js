import { addClientModal } from "./addClient.js";
import { createPrelodaer } from "./preloader.js";
import { svgAddUser } from "./svg.js";

export const createClientsSection = () => {
  const section = document.createElement('section');
  const h1 = document.createElement('h1');
  const container = document.createElement('div');
  const main = document.createElement('main');
  const sortingDisplay = document.createElement('thead');
  const theadTR = document.createElement('tr');
  const sortingDisplayID = document.createElement('th');
  const sortingDisplayName = document.createElement('th');
  const sortingDisplayCreate = document.createElement('th');
  const sortingDisplayEdit = document.createElement('th');
  const sortingDisplayContacts = document.createElement('th');
  const sortingDisplayActions = document.createElement('th');
  const sortingDisplaySpan = document.createElement('span');
  const addUserBtn = document.createElement('button');
  const addUserBtnSvg = document.createElement('span');
  const tableWrapper = document.createElement('div');
  const clientsTable = document.createElement('table');
  const tbody = document.createElement('tbody');
  const createSpan = document.createElement('span');
  const editSpan = document.createElement('span');

  const sortDisplayItems = [sortingDisplayID, sortingDisplayName, sortingDisplayCreate, sortingDisplayEdit];

  for (const item of sortDisplayItems) {
    item.addEventListener('click', () => {
      if (item.classList.contains('sort-down')) {
        item.classList.remove('sort-down');
        item.classList.add('sort-up');
      } else {
        item.classList.add('sort-down');
        item.classList.remove('sort-up');
      }
    })
  }

  sortingDisplayCreate.addEventListener('click', () => {
    if (sortingDisplayCreate.classList.contains('sort-down')) {
      createSpan.classList.add('sort-up');
    } else {
      createSpan.classList.remove('sort-up');
    }
  });

  sortingDisplayEdit.addEventListener('click', () => {
    if (sortingDisplayEdit.classList.contains('sort-down')) {
      editSpan.classList.add('sort-up');
    } else {
      editSpan.classList.remove('sort-up');
    }
  });

  sortingDisplayID.setAttribute('data-type', 'id');
  sortingDisplayName.setAttribute('data-type', 'text');
  sortingDisplayCreate.setAttribute('data-type', 'create');
  sortingDisplayEdit.setAttribute('data-type', 'update');

  section.classList.add('clients');
  tableWrapper.classList.add('clients__wrapper');
  h1.classList.add('clients__heading');
  tbody.classList.add('clients__tbody');
  sortingDisplay.classList.add('clients__display', 'display-info');
  sortingDisplayID.classList.add('display-info__item', 'display-info__item_id', 'sort-up');
  sortingDisplayName.classList.add('display-info__item', 'display-info__item_name', 'sort-down');
  sortingDisplayCreate.classList.add('display-info__item', 'display-info__item_create', 'sort-down');
  sortingDisplayEdit.classList.add('display-info__item', 'display-info__item_change', 'sort-down');
  sortingDisplayContacts.classList.add('display-info__item', 'display-info__item_contacts');
  sortingDisplayActions.classList.add('display-info__item', 'display-info__item_actions');
  sortingDisplaySpan.classList.add('display-info__sorting');
  addUserBtn.classList.add('clients__btn', 'btn-reset');
  addUserBtnSvg.classList.add('clients__svg');
  container.classList.add('container', 'clients__container');
  main.classList.add('main');
  clientsTable.classList.add('clients__table');
  createSpan.classList.add('create__span');
  editSpan.classList.add('change__span');

  h1.textContent = 'Клиенты';
  sortingDisplayID.textContent = 'id';
  sortingDisplayName.textContent = 'Фамилия Имя Отчество';
  sortingDisplayCreate.textContent = 'Дата и время ';
  sortingDisplayEdit.textContent = 'Последние ';
  sortingDisplayContacts.textContent = 'Контакты';
  sortingDisplayActions.textContent = 'Действия';
  sortingDisplaySpan.textContent = 'а-я';
  addUserBtn.textContent = 'Добавить клиента';
  addUserBtnSvg.innerHTML = svgAddUser;

  addUserBtn.addEventListener('click', () => {
    document.body.append(addClientModal());
  })

  main.append(section);
  section.append(container);
  sortingDisplayName.append(sortingDisplaySpan);
  sortingDisplayCreate.append(createSpan);
  sortingDisplayEdit.append(editSpan);
  theadTR.append(
    sortingDisplayID,
    sortingDisplayName,
    sortingDisplayCreate,
    sortingDisplayEdit,
    sortingDisplayContacts,
    sortingDisplayActions
  );
  sortingDisplay.append(theadTR);
  tableWrapper.append(clientsTable, createPrelodaer());
  clientsTable.append(sortingDisplay, tbody);
  addUserBtn.append(addUserBtnSvg);
  container.append(h1, tableWrapper, addUserBtn);

  return { main, clientsTable, tbody }
}
