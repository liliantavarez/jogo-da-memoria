const front = "card_front";
const beck = "card_back";

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

createCards(cardsIcons)

function createCards(cardsIcons){
    let cards = []
    for (let card of cardsIcons) {
        cards.push(createPair(card))
    }
    return cards.flatMap(pair => pair)
}

function createPair(card){
    return[{
        id: createId(card),
        icon: card,
        flipped: false,
    },{
        id: createId(card),
        icon: card,
        flipped: false,
    }]
}

function createId(card){
    return card + parseInt(Math.random() * 1000);
}
