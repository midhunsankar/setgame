import * as rxjs from "rxjs";
import type { Subject } from "rxjs/internal/Subject";
import type { Card } from "../models/card";
import type { Observable } from "rxjs/internal/Observable";

class CardsService {
  private cards: Card[] = [];
  private static cardsListSubject: Subject<Card[]> = new rxjs.Subject<Card[]>();
  private static matchingSets: Subject<Array<Card[]>> = new rxjs.Subject<
    Array<Card[]>
  >();

  constructor() {
    this.cards = this.loadCards();
  }

  private loadCards(): Card[] {
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

  public static getCards(): Observable<Card[]> {
    return this.cardsListSubject.asObservable();
  }

  public static getMatchingSets(): Observable<Array<Card[]>> {
    return this.matchingSets.asObservable();
  }

  public unsubscribe(): void {
    // Unsubscribe from the Subject to prevent memory leaks.
    CardsService.cardsListSubject.unsubscribe();
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
      const max = this.cards.length - 1;
      // Ensure the random index is unique.
      do {
        randomIndex = Math.floor(Math.random() * (max - min + 1) + min);
      } while (shuffledCardIds.includes(randomIndex));
      shuffledCardIds[i] = randomIndex;
    }

    shuffledCardIds.forEach((id) => {
      const card = this.cards.find((c) => c.id === id);
      if (!card) {
        return;
      }
      shuffledCards.push(card);
    });
    // Emit the shuffled cards to the subscribers.
    CardsService.cardsListSubject.next(shuffledCards);
  }

  public solveSet(cards: Card[]): void {
    // Find all sets in the provided cards and emit them.
    const sets = this.findSets(cards);
    if (sets.length > 0) {
      CardsService.matchingSets.next(sets);
    } else {
      CardsService.matchingSets.next([]);
    }
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
