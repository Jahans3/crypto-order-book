import { Order, ProductIds } from "../typings";
import { FEED, PRODUCT_ID } from "../constants";

function initWorker() {
  const socket = new WebSocket("wss://www.cryptofacilities.com/ws/v1");

  let askState: Order[] = [];
  let bidState: Order[] = [];

  const intervalId = setInterval(() => {
    postMessage({ asks: askState, bids: bidState });
  }, 1000);

  function updateDelta(delta: Order[], existing: Order[]) {
    delta.forEach((newOrder) => {
      const [newPrice, newSize] = newOrder;
      const index = existing.findIndex(([price]) => price === newPrice);

      if (index !== -1) {
        if (newSize === 0) {
          existing.splice(index, 1);
        } else {
          existing[index] = [newPrice, newSize];
        }
      } else {
        existing.push([newPrice, newSize]);
      }
    });
  }

  function handleSocketOpen() {
    socket.send(subscribe(PRODUCT_ID.XBT_USD));
  }

  function handleSocketClose() {
    socket.close();
    clearInterval(intervalId);
  }

  function subscribe(to: ProductIds) {
    return JSON.stringify({ event: "subscribe", feed: "book_ui_1", product_ids: [to] });
  }

  function unsubscribe(to: ProductIds) {
    return JSON.stringify({ event: "unsubscribe", feed: "book_ui_1", product_ids: [to] });
  }

  function handleSocketMessage(event: MessageEvent) {
    const data = JSON.parse(event.data);

    switch (data.feed) {
      case FEED.DELTA: {
        const { asks, bids } = data as { asks: Order[]; bids: Order[] };

        updateDelta(asks, askState);
        updateDelta(bids, bidState);

        break;
      }

      case FEED.SNAPSHOT: {
        const { bids, asks } = data;

        askState = asks;
        bidState = bids;

        postMessage({ bids: bidState, asks: askState });

        break;
      }
    }
  }

  socket.addEventListener("open", handleSocketOpen);
  socket.addEventListener("close", handleSocketClose);
  socket.addEventListener("message", handleSocketMessage);
}

initWorker();

export {}; // See: https://www.typescriptlang.org/tsconfig#non-module-files
