let game = {
  cardsIcons: [
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
  shuffleCards: function (cards) {
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
