const cards = document.querySelectorAll('.memory-card');

let fip = false;
let block = false;
let primeiracart, segundacart;

function flipCard() {
  if (block) return;
  if (this === primeiracart) return;

  this.classList.add('flip');

  if (!fip) {
    fip = true;
    primeiracart = this;

    return;
  }

  segundacart = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = primeiracart.dataset.framework === segundacart.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  primeiracart.removeEventListener('click', flipCard);
  segundacart.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  block = true;

  setTimeout(() => {
    primeiracart.classList.remove('flip');
    segundacart.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [fip, block] = [false, false];
  [primeiracart, segundacart] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));
