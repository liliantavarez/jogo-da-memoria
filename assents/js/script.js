const FRONT = "card_front";
const BACK = "card_back";
const CARD = "card";
const ICON = "icon";

startGame();

function startGame() {
  game.createCards();
  initializeCards(game.cards);
}

//inserindo cartas na tela
function initializeCards(cards) {
  //acessando o elemento html onde sera inserido as cartas
  let gameBoard = document.getElementById("gameBoard");

  //usando loop para criar todas as cartas do array
  cards.forEach((card) => {
    //criando div da cada carta e inserindo suas propriedes
    let cardElement = document.createElement("div");
    cardElement.id = card[0].id;
    //adicionado classe a div do elemento
    cardElement.classList.add(CARD);
    cardElement.dataset.icon = card[0].icon;

    createCardContent(card, cardElement);

    //adicionado evento de virar a carta
    cardElement.addEventListener("click", flipCard);
    //adicionando no elemento
    gameBoard.appendChild(cardElement);
  });
}

//criar cartas viarada e desvirada
function createCardContent(card, cardElement) {
  createCardFace(FRONT, card, cardElement);
  createCardFace(BACK, card, cardElement);
}

//criando partes de frente e tras da carta
function createCardFace(face, card, element) {
  //criando div da carta
  let cardElementFace = document.createElement("div");
  cardElementFace.classList.add(face);

  //verificando se a carta ta virada para frente e inserindo a imagen
  if (face === FRONT) {
    let iconElement = document.createElement("img");
    iconElement.classList.add(ICON);
    iconElement.src = "./assents/imagens/" + card[0].icon + ".png";
    cardElementFace.appendChild(iconElement);
  } else {
    //insere simdolo (</>) caso a carta esteja desvirada
    cardElementFace.innerHTML = "&lt/&gt";
  }

  element.appendChild(cardElementFace);
}

//função para virar a carta atraves da class flip criada no CSS
function flipCard() {
  //pega as cartas selecionadas, vira e verifica se são iguais
  if (game.setCard(this.id)) {
    this.classList.add("flip");
    if (game.checkMatch()) {
      game.clearCards();
    } else {
      //inserindo um intervalo para que as cartas sejam desviradas
      setTimeout(() => {
        //desvira cartas caso sejam diferentes
        let firstCardView = document.getElementById(game.firstCard.id);
        let secondCardView = document.getElementById(game.secondCard.id);
        firstCardView.classList.remove("flip");
        secondCardView.classList.remove("flip");
        game.clearCards()
      }, 1000);
    }
  }
}
