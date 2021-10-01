export type Snapshot = "book_ui_1_snapshot";
export type Delta = "book_ui_1";

export type XBTUSDProductID = "PI_XBTUSD";
export type ETHUSDProductID = "PI_ETHUSD";

export type Order = [number, number];
export type Feeds = Delta | Snapshot;
export type ProductIds = XBTUSDProductID | ETHUSDProductID;

export interface OrderData {
  asks: Order[];
  bids: Order[];
  feed: Feeds;
  product_id: ProductIds;
  numLevels: number;
}
