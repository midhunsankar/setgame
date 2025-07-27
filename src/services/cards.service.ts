import * as rxjs from "rxjs";
import type { Subject } from "rxjs/internal/Subject";
import type { Card } from "../models/card";
import type { Observable } from "rxjs/internal/Observable";
import MessagesService from "./messages.service";

class CardsService {
  private deck: Card[] = [];
  private cardsListSubject: Subject<Card[]> = new rxjs.Subject<Card[]>();
  private matchingSets: Subject<Array<Card[]>> = new rxjs.Subject<
    Array<Card[]>
  >();
  private matchUserGuessed: Array<Card[]> = [];
  private messagesService: MessagesService;

  constructor(_messagesService: MessagesService) {
    this.deck = this.loadDeck();
    this.messagesService = _messagesService;
  }

  private loadDeck(): Card[] {
    // Simulate loading cards from a database or API
    return [
      // The first card is a placeholder with no attributes.
      { id: 0, number: 0, color: "none", shape: "none", shading: "none" },

      // The following cards are defined with unique IDs, counts, colors, shapes, and shadings.
      // Each card represents a unique combination of these attributes.
      { id: 1, number: 1, color: "red", shape: "diamond", shading: "open" },
      { id: 2, number: 1, color: "red", shape: "diamond", shading: "striped" },
      { id: 3, number: 1, color: "red", shape: "diamond", shading: "solid" },
      { id: 4, number: 1, color: "green", shape: "diamond", shading: "open" },
      {
        id: 5,
        number: 1,
        color: "green",
        shape: "diamond",
        shading: "striped",
      },
      { id: 6, number: 1, color: "green", shape: "diamond", shading: "solid" },
      { id: 7, number: 1, color: "purple", shape: "diamond", shading: "open" },
      {
        id: 8,
        number: 1,
        color: "purple",
        shape: "diamond",
        shading: "striped",
      },
      { id: 9, number: 1, color: "purple", shape: "diamond", shading: "solid" },
      { id: 10, number: 2, color: "red", shape: "diamond", shading: "open" },
      { id: 11, number: 2, color: "red", shape: "diamond", shading: "striped" },
      { id: 12, number: 2, color: "red", shape: "diamond", shading: "solid" },
      { id: 13, number: 2, color: "green", shape: "diamond", shading: "open" },
      {
        id: 14,
        number: 2,
        color: "green",
        shape: "diamond",
        shading: "striped",
      },
      { id: 15, number: 2, color: "green", shape: "diamond", shading: "solid" },
      { id: 16, number: 2, color: "purple", shape: "diamond", shading: "open" },
      {
        id: 17,
        number: 2,
        color: "purple",
        shape: "diamond",
        shading: "striped",
      },
      {
        id: 18,
        number: 2,
        color: "purple",
        shape: "diamond",
        shading: "solid",
      },
      { id: 19, number: 3, color: "red", shape: "diamond", shading: "open" },
      { id: 20, number: 3, color: "red", shape: "diamond", shading: "striped" },
      { id: 21, number: 3, color: "red", shape: "diamond", shading: "solid" },
      { id: 22, number: 3, color: "green", shape: "diamond", shading: "open" },
      {
        id: 23,
        number: 3,
        color: "green",
        shape: "diamond",
        shading: "striped",
      },
      { id: 24, number: 3, color: "green", shape: "diamond", shading: "solid" },
      { id: 25, number: 3, color: "purple", shape: "diamond", shading: "open" },
      {
        id: 26,
        number: 3,
        color: "purple",
        shape: "diamond",
        shading: "striped",
      },
      {
        id: 27,
        number: 3,
        color: "purple",
        shape: "diamond",
        shading: "solid",
      },
      { id: 28, number: 1, color: "red", shape: "oval", shading: "open" },
      { id: 29, number: 1, color: "red", shape: "oval", shading: "striped" },
      { id: 30, number: 1, color: "red", shape: "oval", shading: "solid" },
      { id: 31, number: 1, color: "green", shape: "oval", shading: "open" },
      { id: 32, number: 1, color: "green", shape: "oval", shading: "striped" },
      { id: 33, number: 1, color: "green", shape: "oval", shading: "solid" },
      { id: 34, number: 1, color: "purple", shape: "oval", shading: "open" },
      { id: 35, number: 1, color: "purple", shape: "oval", shading: "striped" },
      { id: 36, number: 1, color: "purple", shape: "oval", shading: "solid" },
      { id: 37, number: 2, color: "red", shape: "oval", shading: "open" },
      { id: 38, number: 2, color: "red", shape: "oval", shading: "striped" },
      { id: 39, number: 2, color: "red", shape: "oval", shading: "solid" },
      { id: 40, number: 2, color: "green", shape: "oval", shading: "open" },
      { id: 41, number: 2, color: "green", shape: "oval", shading: "striped" },
      { id: 42, number: 2, color: "green", shape: "oval", shading: "solid" },
      { id: 43, number: 2, color: "purple", shape: "oval", shading: "open" },
      { id: 44, number: 2, color: "purple", shape: "oval", shading: "striped" },
      { id: 45, number: 2, color: "purple", shape: "oval", shading: "solid" },
      { id: 46, number: 3, color: "red", shape: "oval", shading: "open" },
      { id: 47, number: 3, color: "red", shape: "oval", shading: "striped" },
      { id: 48, number: 3, color: "red", shape: "oval", shading: "solid" },
      { id: 49, number: 3, color: "green", shape: "oval", shading: "open" },
      { id: 50, number: 3, color: "green", shape: "oval", shading: "striped" },
      { id: 51, number: 3, color: "green", shape: "oval", shading: "solid" },
      { id: 52, number: 3, color: "purple", shape: "oval", shading: "open" },
      { id: 53, number: 3, color: "purple", shape: "oval", shading: "striped" },
      { id: 54, number: 3, color: "purple", shape: "oval", shading: "solid" },
      { id: 55, number: 1, color: "red", shape: "swiggle", shading: "open" },
      { id: 56, number: 1, color: "red", shape: "swiggle", shading: "striped" },
      { id: 57, number: 1, color: "red", shape: "swiggle", shading: "solid" },
      { id: 58, number: 1, color: "green", shape: "swiggle", shading: "open" },
      {
        id: 59,
        number: 1,
        color: "green",
        shape: "swiggle",
        shading: "striped",
      },
      { id: 60, number: 1, color: "green", shape: "swiggle", shading: "solid" },
      { id: 61, number: 1, color: "purple", shape: "swiggle", shading: "open" },
      {
        id: 62,
        number: 1,
        color: "purple",
        shape: "swiggle",
        shading: "striped",
      },
      {
        id: 63,
        number: 1,
        color: "purple",
        shape: "swiggle",
        shading: "solid",
      },
      { id: 64, number: 2, color: "red", shape: "swiggle", shading: "open" },
      { id: 65, number: 2, color: "red", shape: "swiggle", shading: "striped" },
      { id: 66, number: 2, color: "red", shape: "swiggle", shading: "solid" },
      { id: 67, number: 2, color: "green", shape: "swiggle", shading: "open" },
      {
        id: 68,
        number: 2,
        color: "green",
        shape: "swiggle",
        shading: "striped",
      },
      { id: 69, number: 2, color: "green", shape: "swiggle", shading: "solid" },
      { id: 70, number: 2, color: "purple", shape: "swiggle", shading: "open" },
      {
        id: 71,
        number: 2,
        color: "purple",
        shape: "swiggle",
        shading: "striped",
      },
      {
        id: 72,
        number: 2,
        color: "purple",
        shape: "swiggle",
        shading: "solid",
      },
      { id: 73, number: 3, color: "red", shape: "swiggle", shading: "open" },
      { id: 74, number: 3, color: "red", shape: "swiggle", shading: "striped" },
      { id: 75, number: 3, color: "red", shape: "swiggle", shading: "solid" },
      { id: 76, number: 3, color: "green", shape: "swiggle", shading: "open" },
      {
        id: 77,
        number: 3,
        color: "green",
        shape: "swiggle",
        shading: "striped",
      },
      { id: 78, number: 3, color: "green", shape: "swiggle", shading: "solid" },
      { id: 79, number: 3, color: "purple", shape: "swiggle", shading: "open" },
      {
        id: 80,
        number: 3,
        color: "purple",
        shape: "swiggle",
        shading: "striped",
      },
      {
        id: 81,
        number: 3,
        color: "purple",
        shape: "swiggle",
        shading: "solid",
      },
    ];
  }

  public getCards(): Observable<Card[]> {
    return this.cardsListSubject.asObservable();
  }

  public getMatchingSets(): Observable<Array<Card[]>> {
    return this.matchingSets.asObservable();
  }

  public unsubscribe(): void {
    // Unsubscribe from the Subject to prevent memory leaks.
    this.cardsListSubject.unsubscribe();
  }

  public shuffleCards(): void {
    // make an array of length 12.
    let deckSize = 12;
    let shuffledCardIds: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let shuffledCards: Card[] = [];

    for (let i = 0; i < deckSize; i++) {
      let randomIndex: number;
      // Ensure the random number is between 0 and 81 (the total number of cards).
      const min = 0;
      const max = this.deck.length - 1;
      // Ensure the random index is unique.
      do {
        randomIndex = Math.floor(Math.random() * (max - min + 1) + min);
      } while (shuffledCardIds.includes(randomIndex));
      shuffledCardIds[i] = randomIndex;
    }

    shuffledCardIds.forEach((id) => {
      const card = this.deck.find((c) => c.id === id);
      if (!card) {
        return;
      }
      shuffledCards.push(card);
    });

    if (this.findSets(shuffledCards).length === 0) {
      // If no sets are found, reshuffle the cards.
      return this.shuffleCards();
    }

    // Emit the shuffled cards to the subscribers.
    this.updateCards(shuffledCards);
    this.messagesService.clearMessages();
    this.matchUserGuessed = []; // Reset the user's guessed matches
    this.matchingSets.next([]); // Clear previous matches
  }

  public updateCards(cards: Card[]): void {
    // Update the cards in the service and emit the new list.
    this.cardsListSubject.next(cards);
  }

  public solveSet(cards: Card[]): void {
    // Find all sets in the provided cards and emit them.
    const sets = this.findSets(cards);
      this.matchingSets.next(sets);
      this.messagesService.addMessage(
        `Found ${sets.length} matching sets.`,
        "SUCCESS"
      );  
  }

  public checkMatch(selectedCards: Card[]): boolean {
    // Check if the selected cards form a valid set
    if (selectedCards.length !== 3) {
      return false;
    }
    // Check if the selected cards in matchUserGuessed
    if (this.matchUserGuessed.some((match) => match.every((card, index) => card.id === selectedCards[index].id))) {
      this.messagesService.addMessage("You already found this set.", "ERROR");
      return false;
    }

    const output = this.checkSet(selectedCards[0], selectedCards[1], selectedCards[2]);
    if (output) {
      this.matchUserGuessed.push(selectedCards);
      this.messagesService.addMessage("Congratulations! You found a set.", "SUCCESS");
      this.matchingSets.next(this.matchUserGuessed);
    }
    else{
      this.messagesService.addMessage("Sorry, the selected cards do not form a set.", "ERROR");
    }
    return output;
  }

  private findSets(cards: Card[]): Array<Card[]> {
    // Find all sets in the provided cards.
    const sets: Card[][] = [];
    const cardCount = cards.length;

    for (let i = 0; i < cardCount; i++) {
      for (let j = i + 1; j < cardCount; j++) {
        for (let k = j + 1; k < cardCount; k++) {
          if (this.checkSet(cards[i], cards[j], cards[k])) {
            sets.push([cards[i], cards[j], cards[k]]);
          }
        }
      }
    }

    return sets;
  }

  private checkSet(cardA: Card, cardB: Card, cardC: Card): boolean {
    // Check if the three cards form a valid set
    // A valid set must have either all attributes the same or all different for each attribute.

    let validShape = false;
    let validColor = false;
    let validShading = false;
    let validNumber = false;

    if (cardA.shape === cardB.shape && cardB.shape === cardC.shape) {
      validShape = true;
    } else {
      if (
        cardA.shape !== cardB.shape &&
        cardB.shape !== cardC.shape &&
        cardA.shape !== cardC.shape
      ) {
        validShape = true;
      }
    }
    if (cardA.color === cardB.color && cardB.color === cardC.color) {
      validColor = true;
    } else {
      if (
        cardA.color !== cardB.color &&
        cardB.color !== cardC.color &&
        cardA.color !== cardC.color
      ) {
        validColor = true;
      }
    }

    if (cardA.shading === cardB.shading && cardB.shading === cardC.shading) {
      validShading = true;
    } else {
      if (
        cardA.shading !== cardB.shading &&
        cardB.shading !== cardC.shading &&
        cardA.shading !== cardC.shading
      ) {
        validShading = true;
      }
    }

    if (cardA.number === cardB.number && cardB.number === cardC.number) {
      validNumber = true;
    } else {
      if (
        cardA.number !== cardB.number &&
        cardB.number !== cardC.number &&
        cardA.number !== cardC.number
      ) {
        validNumber = true;
      }
    }

    return validShape && validColor && validShading && validNumber;
  }
}

export default CardsService;
