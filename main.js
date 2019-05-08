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
    //  Cards
    // -----
    //  shuffle
    //  stack
  }

  // Cards
  class Card {
    //  val
    //  suit
    //  ----
    //  flip
  }

  // Discard Pile
  class DiscardPile {

  }

  //  Holders
  //  -----
  //  accept or reject
  window.Game = Game;
})(window);
