import { Student } from "./students.js";

// Создание массива экземпляров класса

const students = [];

// проверка объектов на сервере

const response = await fetch('http://localhost:3000/api/students');
const studentsList = await response.json();

studentsList.forEach(student => {

  const serverStudent = new Student(
    student.name,
    student.surname,
    student.lastname,
    Number(student.studyStart),
    new Date(student.birthday),
    student.faculty,
    student.id
  )

  students.push(serverStudent);
})

// Получение переменных

const $studentsList = document.getElementById('students-list'),
  $studentsListTHAll = document.querySelectorAll('th'),
  $filterForm = document.getElementById('filter-form'),
  $fioFilterInp = document.getElementById('filter-form__fio-inp'),
  $facultyFilterInp = document.getElementById('filter-form__faculty-inp'),
  $startStudyFilterInp = document.getElementById('filter-form__startStudy-inp'),
  $endStudyFilterInp = document.getElementById('filter-form__endStudy-inp');

// column для сортировки списка по базовому свойству фио, columnDir для смены направления сортировки по клику

let column = 'fio',
  columnDir = true;

// Создание структуры таблицы студентов html

function newstudentTR(student) {
  const $studentTR = document.createElement('tr'),
    fioTD = document.createElement('td'),
    facultyTD = document.createElement('td'),
    birthDateTD = document.createElement('td'),
    studDateTD = document.createElement('td'),
    deleteTD = document.createElement('td'),
    deleteBtn = document.createElement('button');

  fioTD.textContent = student.fio;
  facultyTD.textContent = student.faculty;
  birthDateTD.textContent = `${student.getBirthDateString()} (${student.getAge()} лет)`;
  studDateTD.textContent = student.getStudPeriod();
  $studentTR.classList.add('item');
  deleteTD.style.width = '150px';
  deleteBtn.style.width = 'inherit';
  deleteBtn.textContent = 'удалить';
  deleteBtn.classList.add('btn', 'btn-danger');

  deleteTD.append(deleteBtn);
  $studentTR.append(fioTD, facultyTD, birthDateTD, studDateTD, deleteTD);
  return $studentTR;
}

// функция сортировки принимает свойство и булевое значение направления сортировки

function getSortStudents(prop, dir) {

  // копируем массив для иммутабельности
  const studentsCopy = [...students];

  //сравниваем предудущее и текущее значение объектов массива по свойству prop, если возвращает -1, то меняет местами
  return studentsCopy.sort(function (studentA, studentB) {
    if (!dir == false ? studentA[prop] < studentB[prop] : studentA[prop] > studentB[prop]) {
      return -1;
    }
  })
}

// перерисовка списка

function render() {
  $studentsList.innerHTML = '';

  console.log($studentsList.innerHTML);

  let studentsCopy = [...students];

  // сортировка

  studentsCopy = getSortStudents(column, columnDir);

  // фильтрация

  if ($fioFilterInp.value.trim() !== "") {
    studentsCopy = studentsCopy.filter(function (student) {
      if (student.fio.includes($fioFilterInp.value.trim())) return true
    })
  }

  if ($facultyFilterInp.value.trim() != "") {
    studentsCopy = studentsCopy.filter(function (student) {
      if (student.faculty.includes($facultyFilterInp.value.trim())) return true
    })
  }

  if ($startStudyFilterInp.value.trim() !== "") {
    studentsCopy = studentsCopy.filter(function (student) {
      if (student.studStart == $startStudyFilterInp.value.trim()) return true
    })
  }

  if ($endStudyFilterInp.value.trim() != "") {
    studentsCopy = studentsCopy.filter(function (student) {
      if ((student.studStart + 4) == $endStudyFilterInp.value.trim()) return true
    })
  }

  for (const student of studentsCopy) {
    $studentsList.append(newstudentTR(student));
  }
}

// при клике по ячейкам шапки меняем направление и column из data-column

$studentsListTHAll.forEach(el => {
  el.addEventListener('click', function () {
    column = this.dataset.column;
    columnDir = !columnDir;
    render();
  })
})

// валидация формы добавления

function validation(form) {

  function removeError(input) {
    const parent = input.parentNode;

    if (parent.classList.contains('error')) {
      parent.querySelector('.error-message').remove();
      parent.classList.remove('error');
    }
  }

  function createError(input, text) {
    const parent = input.parentNode;
    const errorLabel = document.createElement('div');

    errorLabel.classList.add('error-message');
    errorLabel.textContent = text;

    parent.classList.add('error');

    parent.prepend(errorLabel);
  }

  let result = true;

  form.querySelectorAll('input').forEach(el => {
    removeError(el)

    if (el.dataset.name) {
      if (el.value == '') {
        result = false;
        createError(el, 'Введите имя');
      }
    }

    if (el.dataset.surename) {
      if (el.value == '') {
        result = false;
        createError(el, 'Введите фамилию');
      }
    }

    if (el.dataset.lastname) {
      if (el.value == '') {
        result = false;
        createError(el, 'Введите отчество');
      }
    }

    if (el.dataset.faculty) {
      if (el.value == '') {
        result = false;
        createError(el, 'Введите название факультета');
      }
    }

    if (el.dataset.start) {
      if (el.value < el.dataset.start || el.value > new Date().getFullYear()) {
        result = false;
        createError(el, 'Введите год начала учебы с 2000 до 2023');
      }
    }

    if (el.dataset.birthdate) {
      if (el.value == '' || new Date(el.value) < new Date('1900-01-01') || new Date(el.value).getTime() > new Date().getTime()) {
        result = false;
        createError(el, 'Некорректная дата рождения');
      }
    }
  })

  return result
}

// событие добавления формы

document.getElementById('add-student').addEventListener('submit', async function (e) {
  e.preventDefault();

  if (validation(this)) {
    const response = await fetch('http://localhost:3000/api/students', {
      method: 'POST',
      body: JSON.stringify({
        name: document.getElementById('input-name').value,
        surname: document.getElementById('input-surename').value,
        lastname: document.getElementById('input-lastname').value,
        birthday: new Date(document.getElementById('input-birthDate').value),
        studyStart: document.getElementById('input-studStart').value,
        faculty: document.getElementById('input-faculty').value,
      }),
      headers: { 'Content-Type': 'application/json' }
    })

    const student = await response.json()

    students.push(new Student(
      student.name,
      student.surname,
      student.lastname,
      student.studyStart,
      student.birthday,
      student.faculty,
    ))
  }

  render();
})

// события для фильтрации

$filterForm.addEventListener('submit', function (e) {
  e.preventDefault();
})

$fioFilterInp.addEventListener('input', () => {
  render();
})

$facultyFilterInp.addEventListener('input', () => {
  render();
})

$startStudyFilterInp.addEventListener('input', () => {
  render();
})

$endStudyFilterInp.addEventListener('input', () => {
  render();
})

render();

const itemList = document.getElementsByClassName('item'),
  buttons = document.querySelectorAll('.btn-danger');

// добавляем id кнопке, чтобы удалять правильный элемент с сервера

for (let i = 0; i < students.length; i++) {
  buttons[i].dataset.id = students[i].id;
}

// проходим по дом элементам списка студентов, находим кнопки, удаляем при клике элемент,
// проходим по массиву студентов, у которых id и сверяем с data-id у кнопки - удаляем с сервера

for (const item of itemList) {
  const deleteBtn = item.lastChild.firstChild;

  deleteBtn.addEventListener('click', () => {
    item.remove();

    for (const student of students) {
      if (deleteBtn.dataset.id === student.id) {
        fetch(`http://localhost:3000/api/students/${student.id}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' }
        })
      }
    }
  })
}
