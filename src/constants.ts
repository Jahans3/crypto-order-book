import { Delta, ETHUSDProductID, Snapshot, XBTUSDProductID } from "./typings";

export const ATOM_KEY = {
  ORDER_FLOW: "orderFlow",
};

export const PRODUCT_ID = {
  ETH_USD: "PI_ETHUSD" as ETHUSDProductID,
  XBT_USD: "PI_XBTUSD" as XBTUSDProductID,
};

export const FEED = {
  DELTA: "book_ui_1" as Delta,
  SNAPSHOT: "book_ui_1_snapshot" as Snapshot,
};
