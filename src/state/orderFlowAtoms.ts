import { atom } from "recoil";
import { ATOM_KEY, PRODUCT_ID } from "../constants";
import { OrderTotal, ProductIds, Spread, WorkerMessageFunctions } from "../typings";

export const activeProductAtom = atom<ProductIds>({
  key: ATOM_KEY.ACTIVE_PRODUCT,
  default: PRODUCT_ID.XBT_USD,
});

export const spreadAtom = atom<Spread>({
  key: ATOM_KEY.SPREAD,
  default: { spreadNum: 0, spreadPercent: 0 },
});

export const bidFeedAtom = atom<OrderTotal[]>({
  key: ATOM_KEY.BID_FEED,
  default: [],
});

export const askFeedAtom = atom<OrderTotal[]>({
  key: ATOM_KEY.ASK_FEED,
  default: [],
});

export const workerAtom = atom<undefined | Worker>({
  key: ATOM_KEY.WORKER,
  default: undefined,
});

export const workerMessagesAtom = atom<undefined | WorkerMessageFunctions>({
  key: ATOM_KEY.WORKER_MESSAGES,
  default: undefined,
});
