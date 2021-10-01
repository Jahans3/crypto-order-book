import { Delta, ETHUSDProductID, Snapshot, XBTUSDProductID } from "./typings";

export const UPDATE_FREQUENCY_MS = 300;

export const ATOM_PREFIX = "@orderFlow_";

export const ATOM_KEY = {
  SPREAD: `${ATOM_PREFIX}spread`,
  ACTIVE_PRODUCT: `${ATOM_PREFIX}activeProduct`,
  BID_FEED: `${ATOM_PREFIX}bidFeed`,
  ASK_FEED: `${ATOM_PREFIX}askFeed`,
};

export const PRODUCT_ID = {
  ETH_USD: "PI_ETHUSD" as ETHUSDProductID,
  XBT_USD: "PI_XBTUSD" as XBTUSDProductID,
};

export const FEED = {
  DELTA: "book_ui_1" as Delta,
  SNAPSHOT: "book_ui_1_snapshot" as Snapshot,
};
