export interface Deck {
  id: string;
  name: string;
  cardCount: number;
  image: string;
}

export interface DeckCard {
  id: string;
  name: string;
  image: string;
  quantity: number;
}

export interface DeckDetail {
  id: string;
  name: string;
  description: string;
  totalCards: number;
  colors: string[];
  cards: DeckCard[];
  manaCurve: number[];
}
