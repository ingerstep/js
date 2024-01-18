class Student {

  // Конструктор для доступа переменных в область видимости класса и передачи их в аргумент при создании экземпляра класса

  constructor(name, surenamem, lastname, studStart, birthDate, faculty, id) {
    this.name = name;
    this.surename = surenamem;
    this.lastname = lastname;
    this.studStart = studStart;
    this.birthDate = birthDate;
    this.faculty = faculty;
    this.id = id;
  }

  // Функция получения ФИО

  get fio() { return `${this.surename} ${this.name} ${this.lastname}` };

  // функция получения периода обучения

  getStudPeriod() {
    const today = new Date();

    if ((today.getFullYear() - this.studStart) > 4 || (today.getFullYear() - this.studStart) === 4 && today.getMonth() > 7) {
      return `${this.studStart}-${this.studStart + 4} (закончил)`;
    } else {
      return `${today.getFullYear() - this.studStart} курс`;
    }
  };

  // Функция получения даты рождения в формате строки

  getBirthDateString() {
    const yyyy = this.birthDate.getFullYear();

    let mm = this.birthDate.getMonth() + 1,
      dd = this.birthDate.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    return `${dd}.${mm}.${yyyy}`;
  }

  // Функция получения возраста

  getAge() {
    const today = new Date();

    let age = today.getFullYear() - this.birthDate.getFullYear();
    let m = today.getMonth() - this.birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < this.birthDate.getDate())) {
      age--;
    }

    return age;
  }
}

export { Student }
