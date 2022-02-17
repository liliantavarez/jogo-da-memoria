let game = {
  lockMode: false,
  firstCard: null,
  secondCard: null,

  setCard: function (id) {
    //reservando carta que foi virada
    let card = this.cards.filter((card) => card[0].id === id)[0][0];

    //verificar se carta ja esta virada ou se esta esperando virar a proxima
    if (card.flipped || this.lockMode) {
      return false;
    }

    //varifica se é a primeira carta virada caso nao seja insere como sendo a segunda carta
    if (!this.firstCard) {
      this.firstCard = card;
      this.firstCard.flipped = true;
      return true;
    } else {
      this.secondCard = card;
      this.secondCard.flipped = true;
      this.lockMode = true;
      return true;
    }
  },

  //verificando se cartas são iguais
  checkMatch: function () {
    if (!this.firstCard || !this.secondCard) {
      return false;
    }
    return this.firstCard.icon == this.secondCard.icon;
  },

  //resetando variaveis para proxima verificação
  clearCards: function () {
    this.firstCard = null;
    this.secondCard = null;
    this.lockMode = false;
  },

  unflipCards: function () {
    this.firstCard.flipped = false;
    this.secondCard.flipped = false;
    this.clearCards();
  },

  //verifica quais cartas não estão viradas
  checkGameOver() {
    return this.cards.filter((card) => !card[0].flipped).length == 0;
  },

  cardsIcons: [
    "cups",
    "designer",
    "gamer",
    "laptop",
    "microphone",
    "programmer",
    "science",
    "workplace",
  ],

  cards: null,

  //criando as cartas do jogo
  createCards: function () {
    this.cards = []; //array para guardar as cartas
    this.cardsIcons.forEach((card) => {
      this.cards.push(this.createPair(card)); //inserindo o par de cada uma das cartas
    });
    this.cards = this.cards.flatMap((pair) => pair); //desmembreando os parees de cartas com função flapMap()
    this.shuffleCards();
  },

  //criando os pares de cartas iguais apenas com IDs diferentes
  createPair: function (card) {
    return [
      {
        id: this.createId(card),
        icon: card,
        flipped: false,
      },
      {
        id: this.createId(card),
        icon: card,
        flipped: false,
      },
    ];
  },

  //gerando um id para cada umas das cartas
  createId: function (card) {
    return card + parseInt(Math.random() * 1000);
  },

  //embaralhando as cartas dentro do array
  shuffleCards: function () {
    let currentIndex = this.cards.length;
    let randomIndex = 0;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [this.cards[randomIndex], this.cards[currentIndex]] = [
        this.cards[currentIndex],
        [this.cards[randomIndex]],
      ];
    }
  },
};
