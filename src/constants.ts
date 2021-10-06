import {
  Delta,
  ETHUSDProductID,
  Snapshot,
  WorkerClose,
  WorkerSleep,
  WorkerWake,
  WorkerToggleProduct,
  XBTUSDProductID,
  Bid,
  Ask,
  NotificationHidden,
  NotificationVisible,
} from "./typings";

// Prefix in case of possible future atom key collisions
export const ATOM_PREFIX = "@orderFlow_";

export const ATOM_KEY = {
  SPREAD: `${ATOM_PREFIX}spread`,
  ACTIVE_PRODUCT: `${ATOM_PREFIX}activeProduct`,
  BID_FEED: `${ATOM_PREFIX}bidFeed`,
  ASK_FEED: `${ATOM_PREFIX}askFeed`,
  WORKER: `${ATOM_PREFIX}worker`,
  WORKER_MESSAGES: `${ATOM_PREFIX}messages`,
  NOTIFICATION_STATUS: `${ATOM_PREFIX}notificationStatus`,
  NOTIFICATION_UPTIME: `${ATOM_PREFIX}notificationUptime`,
  NOTIFICATION_MESSAGE: `${ATOM_PREFIX}notificationMessage`,
  ON_NOTIFICATION_CLOSE: `${ATOM_PREFIX}onNotificationClose`,
};

export const PRODUCT_ID = {
  ETH_USD: "PI_ETHUSD" as ETHUSDProductID,
  XBT_USD: "PI_XBTUSD" as XBTUSDProductID,
};

export const FEED = {
  DELTA: "book_ui_1" as Delta,
  SNAPSHOT: "book_ui_1_snapshot" as Snapshot,
};

export const WORKER_MESSAGE = {
  CLOSE: "close" as WorkerClose,
  TOGGLE_PRODUCT: "toggle" as WorkerToggleProduct,
  SLEEP: "sleep" as WorkerSleep,
  WAKE: "wake" as WorkerWake,
};

export const ORDER_TYPE = {
  BID: "bid" as Bid,
  ASK: "ask" as Ask,
};

export const NOTIFICATION_STATUS = {
  HIDDEN: "hidden" as NotificationHidden,
  VISIBLE: "visible" as NotificationVisible,
};

export const MOBILE_BREAKPOINT = 768;
