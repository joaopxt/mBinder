export interface TradeUser {
  id: string;
  name: string;
  avatar: string;
  commonCards: number;
}

export interface TradeCard {
  id: string;
  name: string;
  image: string;
  type: string;
  rarity: string;
}

export interface TradePair {
  userCard: TradeCard;
  otherCard: TradeCard;
  user: TradeUser;
}

export type MatchType = "want" | "offer";
