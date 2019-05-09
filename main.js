(window => {
  class Game {
    constructor(el, options) {
      this.el = document.querySelector(el);
      this.options = options;

      this.infoDiv = document.createElement('div');
      this.infoDiv.id = 'info-div';

      this.deckDiv = document.createElement('div');
      this.deckDiv.id = 'deck-div';
      this.gameDeck = new Deck(this.deckDiv, this.options);
      this.gameDeck.buildDeck();

      let shuffleBtn = document.createElement('button');
      shuffleBtn.innerText = 'Shuffle';
      shuffleBtn.onclick = this.gameDeck.shuffle.bind(this);

      this.infoDiv.appendChild(shuffleBtn);

      this.el.appendChild(this.infoDiv);
      this.el.appendChild(this.deckDiv);

      //  Rules
      this.rules = {
        discardRow: [
          {
            name: ' Got it!',
            droppable: true,
            maxcards: this.deckDiv.children.length,
            piles: 1
          }
        ],
        gameComplete: e => {
          if (e.currentTarget.childNodes.length === this.discardRow[0].maxcards) {
            console.log('You win!');
          }
        }
      };
      this.buildDiscard();
    }

    //  Discard Pile
    buildDiscard = () => {
      for (let i = this.rules.discardRow.length - 1; i >= 0; i--) {
        let zone = document.createElement('div');
        zone.className = 'zone row';
        let discardRule = this.rules.discardRow[i];
        let c = 0;
        while (c < discardRule.piles) {
          let discardObj = new DiscardPile();
          discardObj.name = discardRule.name;
          discardObj.droppable = discardRule.droppable;
          discardObj.id = `pile-${c}`;
          let buildObj = discardObj.init();
          zone.appendChild(buildObj);
          c++;
        }
        this.el.appendChild(zone);
      }
    };
  }

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
      this.stack(this.deckDiv);
    };
  }

  Deck.prototype.stack = function (deckDiv) {
    let cards = deckDiv.children;
    for (let i = cards.length - 1; i >= 0; i--) {
      cards[i].style.top = `${i}px`;
      cards[i].style.left = `${i}px`;
      cards[i].classList.add('stacked-card');
    }
  };

  Deck.prototype.shuffle = function () {
    let cardsToShuffle = this.gameDeck.deckData;
    let m = cardsToShuffle.length, t, i;
    while (m) {
      i = Math.floor(Math.random() * m--);
      t = cardsToShuffle[m];
      cardsToShuffle[m] = cardsToShuffle[i];
      cardsToShuffle[i] = t;
    }
    this.gameDeck.deckData = cardsToShuffle;
    this.gameDeck.buildDeck(this.deckDiv);
  };

  class Card {
    constructor() {
      this.id = '';
      this.data = '';
      this.cardContainer = document.createElement('div');
      this.cardContainer.className = 'card-container';
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
      let learnMore = document.createElement('a');
      learnMore.innerText = 'Learn More';
      learnMore.href = this.data.link;
      learnMore.target = '_blank';
      let infoImage = document.createElement('img');
      infoImage.src = 'images/info.svg';
      learnMore.appendChild(infoImage);
      learnMore.addEventListener('click', e => {
        e.stopPropagation();
      });
      backValDiv.appendChild(learnMore);
      categoryDiv.innerHTML = this.data.category;
      this.cardFront.appendChild(frontValDiv);
      this.cardFront.appendChild(categoryDiv);
      this.cardBack.appendChild(backValDiv);
      flipDiv.appendChild(this.cardFront);
      flipDiv.appendChild(this.cardBack);
      this.cardContainer.id = this.id;
      this.cardContainer.appendChild(flipDiv);
      this.cardContainer.onclick = cardClick;
      this.cardContainer.draggable = true;
      this.cardContainer.ondragstart = cardDrag;
      parentFrag.appendChild(this.cardContainer);
    };
  }

  const cardClick = (() => {
    let counter = 0;
    return e => {
      e.currentTarget.classList.toggle('flip-card');
      e.currentTarget.classList.toggle('slide-over');
      e.currentTarget.style.zIndex = counter.toString();
      counter++;
    };
  })();

  const cardDrag = e => {
    e.dataTransfer.setData('text/plain', e.currentTarget.id);
  };

  class DiscardPile {
    constructor() {
      this.name = '';
      this.droppable;
      this.id = '';
    }

    init = () => {
      let holderContainer = document.createElement('div'),
        holderLabel = document.createElement('div'),
        holderTarget = document.createElement('div');
      holderTarget.ondragover = e => e.preventDefault();
      holderTarget.ondrop = this.cardDrop;
      holderContainer.className = 'holder-container';
      holderLabel.className = 'holder-label';
      holderTarget.className = 'holder-target';
      holderLabel.innerText = this.name;
      holderContainer.appendChild(holderLabel);
      holderContainer.appendChild(holderTarget);
      return holderContainer;
    };
  }

  DiscardPile.prototype.cardDrop = e => {
    const cardID = e.dataTransfer.getData('text/plain');
    const cardDragging = document.querySelector(`#${cardID}`);
    cardDragging.style.top = '0px';
    cardDragging.style.left = '0px';
    e.currentTarget.appendChild(cardDragging);
  };
  //  Holders
  //  -----
  //  accept or reject
  window.Game = Game;
})(window);
