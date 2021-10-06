import { Order, OrderTotal, ProductIds, Spread } from "../../typings";
import { FEED, PRODUCT_ID, WORKER_MESSAGE } from "../../constants";

export const UPDATE_FREQUENCY_MS = 300;

function getSocket() {
  return new WebSocket("wss://www.cryptofacilities.com/ws/v1");
}

function initSocket(initialActiveProduct: ProductIds = PRODUCT_ID.XBT_USD) {
  let socket: WebSocket | null = getSocket();

  let askState: OrderTotal[] = [];
  let bidState: OrderTotal[] = [];

  let activeProduct: ProductIds = initialActiveProduct;
  let shouldUpdate = true;

  let intervalId: NodeJS.Timer;

  function handleWorkerMessage(event: MessageEvent) {
    const {
      data: { message },
    } = event;

    switch (message) {
      case WORKER_MESSAGE.SLEEP:
        handleSocketSleep();
        break;

      case WORKER_MESSAGE.WAKE:
        handleSocketWake();
        break;

      case WORKER_MESSAGE.TOGGLE_PRODUCT:
        handleSocketProductToggle();
    }
  }

  function handleSocketOpen() {
    socket?.send(subscribe(activeProduct));
    intervalId = setInterval(() => {
      shouldUpdate = true;
    }, UPDATE_FREQUENCY_MS);
  }

  function handleSocketClose() {
    socket?.removeEventListener("message", handleSocketMessage);
    socket?.removeEventListener("open", handleSocketOpen);
    socket?.removeEventListener("close", handleSocketClose);
    clearInterval(intervalId);
    socket = null;
  }

  function handleSocketSleep() {
    socket?.send(unsubscribe(activeProduct));
    socket?.close();
  }

  function handleSocketWake() {
    initSocket(activeProduct);
  }

  function handleSocketProductToggle() {
    askState = [];
    bidState = [];

    socket?.send(unsubscribe(activeProduct));

    activeProduct = activeProduct === PRODUCT_ID.XBT_USD ? PRODUCT_ID.ETH_USD : PRODUCT_ID.XBT_USD;

    socket?.send(subscribe(activeProduct));

    postMessage({ activeProductUpdated: activeProduct });
  }

  function handleSocketMessage(event: MessageEvent) {
    const data = JSON.parse(event.data);

    function postUpdate({ asks, bids, ...rest }: { asks: Order[]; bids: Order[] }) {
      if (!asks && !bids) return;

      askState = updateDelta(asks, askState, "asc");
      bidState = updateDelta(bids, bidState, "desc");

      const { spreadNum, spreadPercent } = getSpread(askState, bidState);

      postMessage({ spread: { spreadNum, spreadPercent }, bids: bidState, asks: askState, ...rest });
    }

    switch (data.feed) {
      case FEED.DELTA: {
        if (!data.asks && !data.bids) return;

        if (shouldUpdate) {
          postUpdate(data);

          shouldUpdate = false;
        }

        break;
      }

      case FEED.SNAPSHOT: {
        postUpdate(data);
      }
    }
  }

  // Socket handlers
  socket.addEventListener("open", handleSocketOpen);
  socket.addEventListener("close", handleSocketClose);
  socket.addEventListener("message", handleSocketMessage);

  // Worker handlers
  global.onmessage = handleWorkerMessage;
}

function subscribe(to: ProductIds) {
  return JSON.stringify({ event: "subscribe", feed: "book_ui_1", product_ids: [to] });
}

function unsubscribe(to: ProductIds) {
  return JSON.stringify({ event: "unsubscribe", feed: "book_ui_1", product_ids: [to] });
}

function sortAscending([a]: OrderTotal, [b]: OrderTotal) {
  return a - b;
}

function sortDescending([a]: OrderTotal, [b]: OrderTotal) {
  return b - a;
}

export function getNewTotals(orders: OrderTotal[]): OrderTotal[] {
  const result: OrderTotal[] = [];

  for (let i = 0; i < orders.length; i++) {
    const [price, size] = orders[i];

    if (i === 0) {
      result.push([price, size, size]);
      continue;
    }

    const [, , previousTotal] = result[i - 1];

    result.push([price, size, size + previousTotal]);
  }

  return result;
}

export function updateDelta(delta: Order[], existing: OrderTotal[], sort: "asc" | "desc"): OrderTotal[] {
  const sortFunction = sort === "asc" ? sortAscending : sortDescending;

  for (let i = 0; i < delta.length; i++) {
    const [newPrice, newSize] = delta[i];
    const matchedIndex = existing.findIndex(([price]) => price === newPrice);

    if (matchedIndex !== -1) {
      if (newSize === 0) {
        existing.splice(matchedIndex, 1);
      } else {
        existing[matchedIndex] = [newPrice, newSize, 0];
      }
    } else if (newSize !== 0) {
      existing.push([newPrice, newSize, 0]);
    }
  }

  existing.sort(sortFunction);

  return getNewTotals(existing.slice(0, 100));
}

export function getSpread(askState: OrderTotal[], bidState: OrderTotal[]): Spread {
  const topAsk = askState[0][0];
  const topBid = bidState[0][0];
  const spreadNum = Math.abs(topAsk - topBid);
  const spreadPercent = 100 * Math.abs((topAsk - topBid) / ((topAsk + topBid) / 2));

  return { spreadNum, spreadPercent };
}

initSocket();
