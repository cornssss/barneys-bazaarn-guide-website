export interface CategoryType {
  Name: string;
  Color: string;
  Tiers: TierType[];
}

export interface TierType {
  Tier: number;
  Points: number;
  Multiplier: number;
  Price: number;
  PriceOverPoints: number;
  Items: ItemType[];
}

export interface ItemType {
  id: string;
  Name: string;
  Quantity: number;
  Price: number;
  totalQuantity: number;
  totalPrice: number;
  Icon: string;
}

export interface PricesType {
  [key: string]: {
    coins: number;
    pixel: number;
  };
}
export interface MarketType {
  lastUpdated: number; // Define the type for lastUpdated as a number (Unix timestamp)
}
