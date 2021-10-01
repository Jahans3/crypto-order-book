import { Order, OrderTotal, ProductIds } from "../typings";
import { FEED, PRODUCT_ID } from "../constants";

function initWorker() {
  const socket = new WebSocket("wss://www.cryptofacilities.com/ws/v1");

  let askState: OrderTotal[] = [];
  let bidState: OrderTotal[] = [];

  let shouldUpdate = true;

  const intervalId = setInterval(() => {
    shouldUpdate = true;
  }, 1000);

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

    function postUpdate({ asks, bids, ...rest }: { asks: Order[]; bids: Order[] }) {
      if (!asks && !bids) return;

      askState = updateDelta(asks, askState, "desc");
      bidState = updateDelta(bids, bidState, "asc");

      postMessage({ bids: bidState, asks: askState, ...rest });
    }

    switch (data.feed) {
      case FEED.DELTA: {
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

  socket.addEventListener("open", handleSocketOpen);
  socket.addEventListener("close", handleSocketClose);
  socket.addEventListener("message", handleSocketMessage);
}

function sortAscending([a]: OrderTotal, [b]: OrderTotal) {
  return a - b;
}

function sortDescending([a]: OrderTotal, [b]: OrderTotal) {
  return b - a;
}

function getNewTotals(orders: OrderTotal[]): OrderTotal[] {
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

function updateDelta(delta: Order[], existing: OrderTotal[], sort: "asc" | "desc") {
  const sortFunction = sort === "asc" ? sortAscending : sortDescending;

  delta.forEach((newOrder) => {
    const [newPrice, newSize] = newOrder;
    const index = existing.findIndex(([price]) => price === newPrice);

    if (index !== -1) {
      if (newSize === 0) {
        existing.splice(index, 1);
      } else {
        existing[index] = [newPrice, newSize, 0];
      }
    } else if (newSize !== 0) {
      existing.push([newPrice, newSize, 0]);
    }
  });

  existing.sort(sortFunction);

  return getNewTotals(existing);
}

initWorker();
