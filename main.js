(window => {
  // Game
  class Game {
    constructor(el, options) {
      this.el = document.querySelector(el);
      this.options = options;

      //  Info section
      this.infoDiv = document.createElement('div');
      this.infoDiv.id = 'info-div';

      //  Deck
      this.deckDiv = document.createElement('div');
      this.deckDiv.id = 'deck-div';
      this.gameDeck = new Deck(this.deckDiv, this.options);
      this.gameDeck.buildDeck();

      this.el.appendChild(this.infoDiv);
      this.el.appendChild(this.deckDiv);
      //  Discard Pile
      //  Rules
    }
  }

  // Deck
  class Deck {
    constructor(deckDiv, options) {
      this.deckDiv = deckDiv;
      this.deckData = options.data;
      this.card = new Card();
    }

    buildDeck = () => {
      let parentFrag = document.createDocumentFragment();
      this.deckDiv.innerHTML = '';
      for (let i = this.deckData.length - 1; i >= 0; i--) {
        let card = new Card();
        card.id = `card-${i}`;
        card.data = this.deckData[i];
        card.buildCard(parentFrag);
      }
      this.deckDiv.appendChild(parentFrag);
    };
  }

  //  Cards
  // -----
  //  shuffle
  //  stack
  class Card {
    constructor() {
      this.id = '';
      this.data = '';
      this.cardContainer = document.createElement('div');
      this.cardContainer.className = 'card-container';
      this.cardContainer.onclick = (e) => {
        e.currentTarget.classList.toggle('flip-card');
        e.currentTarget.classList.toggle('slide-over');
      };
      this.cardFront = document.createElement('div');
      this.cardFront.className = 'card-front';
      this.cardBack = document.createElement('div');
      this.cardBack.className = 'card-back';
    }

    buildCard = parentFrag => {
      let flipDiv = document.createElement('div'),
        frontValDiv = document.createElement('div'),
        backValDiv = document.createElement('div'),
        categoryDiv = document.createElement('div');
      flipDiv.className = 'flip';
      frontValDiv.className = 'front-val';
      backValDiv.className = 'back-val';
      categoryDiv.className = 'cat-val';
      frontValDiv.innerHTML = this.data.q;
      backValDiv.innerHTML = this.data.a;
      categoryDiv.innerHTML = this.data.category;
      this.cardFront.appendChild(frontValDiv);
      this.cardFront.appendChild(categoryDiv);
      this.cardBack.appendChild(backValDiv);
      flipDiv.appendChild(this.cardFront);
      flipDiv.appendChild(this.cardBack);
      this.cardContainer.id = this.id;
      this.cardContainer.appendChild(flipDiv);
      parentFrag.appendChild(this.cardContainer);
    };
  }

  // Cards
  //  val
  //  suit
  //  ----
  //  flip

  // Discard Pile
  class DiscardPile {

  }

  //  Holders
  //  -----
  //  accept or reject
  window.Game = Game;
})(window);
