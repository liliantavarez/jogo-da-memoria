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

//criando as cartas do jogo
function createCards(cardsIcons) {
  let cards = []; //array para guardar as cartas
  for (let card of cardsIcons) {
    cards.push(createPair(card)); //inserindo o par de cada uma das cartas
  }
  return cards.flatMap((pair) => pair);//desmembreando os parees de cartas com função flapMap()
}

//criando os pares de cartas iguais apenas com IDs diferentes
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

//gerando um id para cada umas das cartas
function createId(card) {
  return card + parseInt(Math.random() * 1000);
}

//embaralhando as cartas dentro do array
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

//inserindo cartas na tela
function initializeCards(cards) {
  //acessando o elemento html onde sera inserido as cartas
  let gameBoard = document.getElementById("gameBoard");
  
  //usando loop para criar todas as cartas do array
  cards.forEach((card) => {
    //criando div da cada carta e inserindo suas propriedes
    let cardElement = document.createElement("div");
    cardElement.id = card.id;
    //adicionado classe a div do elemento 
    cardElement.classList.add(CARD);
    cardElement.dataset.icon = card.icon;

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
    cardElementFace.appendChild(iconElement)
  } else {
    //insere simdolo (</>) caso a carta esteja desvirada
    cardElementFace.innerHTML = "&lt/&gt";
  }

  element.appendChild(cardElementFace)
}

//função para virar a carta atraves da class flip criada no CSS
function flipCard() {
    this.classList.add('flip')
}
