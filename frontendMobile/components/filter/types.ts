export interface FilterState {
  colors: string[];
  types: string[];
  sets: string[];
  rarity: string[];
  cmc: {
    min: number;
    max: number;
  };
}

export interface FilterLists {
  sets: string[];
  colors: string[];
  types: string[];
  rarities: string[];
}

export interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

export interface FilterSection {
  title: string;
  key: keyof FilterState;
  type: "multiselect" | "range";
  options?: FilterOption[];
  min?: number;
  max?: number;
}
