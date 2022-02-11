const FRONT = "card_front";
const BACK = "card_back";
const CARD = "card";
const ICON = "icon";
let cards = null;

let cardsIcons = [
  "cups",
  "designer-cat",
  "designer",
  "gamer",
  "laptop",
  "microphone",
  "programmer-girl",
  "programmer",
  "science",
  "workplace",
];
startGame();

function startGame(cards) {
  cards = createCards(cardsIcons);
  shuffleCards(cards);
  initializeCards(cards);
}

function initializeCards(cards) {
  let gameBoard = document.getElementById("gameBoard");
  cards.forEach((card) => {
    let cardElement = document.createElement("div");
    cardElement.id = card.id;
    cardElement.classList.add(CARD);
    cardElement.dataset.icon = card.icon;

    createCardContent(card, cardElement);

    cardElement.addEventListener("click", flipCard);
    gameBoard.appendChild(cardElement);
  });
}

function createCardContent(card, cardElement) {
  createCardFace(FRONT, card, cardElement);
  createCardFace(BACK, card, cardElement);
}

function createCardFace(face, card, element) {
  let cardElementFace = document.createElement("div");
  cardElementFace.classList.add(face);
  if (face === FRONT) {
    let iconElement = document.createElement("img");
    iconElement.classList.add(ICON);
    iconElement.src = "./assents/imagens/" + card[0].icon + ".png";
    cardElementFace.appendChild(iconElement)
  } else {
    cardElementFace.innerHTML = "&lt/&gt";
  }
  element.appendChild(cardElementFace)
}

function shuffleCards(cards) {
  let currentIndex = cards.length;
  let randomIndex = 0;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [cards[randomIndex], cards[currentIndex]] = [
      cards[currentIndex],
      [cards[randomIndex]],
    ];
  }
}

function createCards(cardsIcons) {
  let cards = [];
  for (let card of cardsIcons) {
    cards.push(createPair(card));
  }
  return cards.flatMap((pair) => pair);
}

function createPair(card) {
  return [
    {
      id: createId(card),
      icon: card,
      flipped: false,
    },
    {
      id: createId(card),
      icon: card,
      flipped: false,
    },
  ];
}

function createId(card) {
  return card + parseInt(Math.random() * 1000);
}

function flipCard() {
    this.classList.add('flip')
}
