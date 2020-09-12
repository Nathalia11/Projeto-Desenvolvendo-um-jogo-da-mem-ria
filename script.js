const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;


function flipCard() {
    if(lockBoard) return;
    if(this === firstCard) return; // para evitar duplo click //

    this.classList.add('flip')  // this: o contexto da nossa função; Dentro dessa função o contexto quano for chamado ele vai ser o que estivermos clicando/ add: ele so adiciona classe uma unica vez //
    if(!hasFlippedCard){
        hasFlippedCard = true;
        firstCard = this;
        return;
    }
    secondCard = this;
    hasFlippedCard = false;
    checkForMath();
}

function checkForMath(){  // se as cartas forem iguais //
    if(firstCard.dataset.card === secondCard.dataset.card) {
        disableCard();
        return;
    }
    unflipCards();
}

function disableCard() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() { // se as cartas não forem iguais // 
    lockBoard = true; // para evitar que cliquem em mais de duas cartas na mesma rodada //

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1250);
}

function resetBoard() {  // resetando o jogo
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() { // função de embaralhar as cartas //
    cards.forEach((card) => {
        let ramdomPosition = Math.floor(Math.random() * 12);
        card.style.order = ramdomPosition; // sempre que o jogo começar as cartas estaram em posições diferentes //
    })
}) ();

cards.forEach((card) => {
    card.addEventListener('click', flipCard)
});


