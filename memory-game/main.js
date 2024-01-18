(() => {
  const btnWrapper = document.createElement('div');

  function createNumbersArray(count) {
    let arrayNumbers = [];
    let counter = 0;

    for (let i = 0; i < count / 2; i++) {
      counter += 1;
      arrayNumbers.push(counter, counter);
    }

    return arrayNumbers;
  }

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  function startGame(count) {
    let array = createNumbersArray(count);

    shuffle(array);

    const restartBtn = document.createElement('button');
    restartBtn.classList.add('btn', 'hidden');
    restartBtn.textContent = 'Рестарт';

    const timerElement = document.createElement('span');
    timerElement.classList.add('timer');
    timerElement.innerHTML = 60;

    btnWrapper.classList.add('wrapper');

    document.body.append(btnWrapper, timerElement, restartBtn);

    const wrapperWidth = Math.sqrt(count) * 100 + Math.sqrt(count) * 10;

    btnWrapper.style.width = `${wrapperWidth}px`;

    for (const item of array) {
      let card = document.createElement('button');
      card.classList.add('card');
      card.textContent = item;
      btnWrapper.append(card);
    }

    let cards = document.querySelectorAll('.card');

    function timer() {
      if (timerElement.innerHTML == 0) {
        btnWrapper.classList.add('game-over');
        restartBtn.classList.remove('hidden');

        clearInterval(intervalId);
      } else {
        if (timerElement.innerHTML == 10) {
          timerElement.style.color = 'red';
        }
        timerElement.innerHTML -= 1;
      }
    };

    let intervalId = setInterval(timer, 1000);

    let firstCard = null;
    let secondCard = null;
    let third = false;
    let clickable = true;
    let cardsFind = 0;

    cards.forEach((card, index) => card.addEventListener(('click'), () => {
      if (clickable == true && !card.classList.contains('find')) {
        card.classList.add('disabled');
        card.disabled = true;

        if (third == true) {
          if (cards[firstCard].textContent !== cards[secondCard].textContent) {
            setTimeout(() => {
              cards[firstCard].classList.remove('disabled');
              cards[secondCard].classList.remove('disabled');
              cards[index].classList.remove('disabled');

              cards[firstCard].disabled = false;
              cards[secondCard].disabled = false;
              cards[index].disabled = false;

              firstCard = null;
              secondCard = null;
              clickable = true;
              third = false
            }, 200);
          }
        }

        if (firstCard == null) {
          firstCard = index;
        } else if (secondCard == null) {
          secondCard = index;
        } else {
          clickable = false;
        }

        if (firstCard != null && secondCard != null && firstCard != secondCard) {
          if (cards[firstCard].textContent === cards[secondCard].textContent) {
            setTimeout(() => {
              cards[firstCard].classList.add('find');
              cards[secondCard].classList.add('find');
              cardsFind += 2;

              firstCard = null;
              secondCard = null;
              clickable = true;
              third = false

              if (cardsFind == cards.length) {
                clearInterval(intervalId);
                restartBtn.classList.remove('hidden');
              }
            }, 200);
          } else {
            third = true;
          }
        }
      }
    }))

    restartBtn.addEventListener('click', () => {
      location.reload();
    })
  }

  (() => {
    btnWrapper.classList.add('hidden');

    const input = document.createElement('input');
    const startBtn = document.createElement('button');

    startBtn.textContent = 'Начать игру';
    startBtn.disabled = true;
    startBtn.classList.add('btn');

    input.type = 'number';
    input.placeholder = 'Введите количество карточек по вертикали от 2 до 10';
    input.classList.add('input');

    document.body.append(input, startBtn);

    input.addEventListener('input', () => {
      if (input.value >= 2 && input.value <= 10) {
        startBtn.disabled = false;

        let countCards = input.value;

        if (input.value % 2 > 0) {
          countCards = 4;
        }

        startBtn.addEventListener('click', () => {
          setTimeout(() => {
            btnWrapper.classList.remove('hidden');
            input.classList.add('hidden');
            startBtn.classList.add('hidden');

            startGame(countCards * countCards);
          }, 500);
        })
      } else {
        startBtn.disabled = true;
      }
    })
  })();
})();


