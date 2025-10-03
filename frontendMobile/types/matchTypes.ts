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
  set: string;
}

export interface TradePair {
  userCard: TradeCard;
  otherCard: TradeCard;
  user: TradeUser;
}

export type MatchType = "want" | "passe";
