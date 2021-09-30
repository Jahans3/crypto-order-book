import React, { useEffect, useMemo, useState } from "react";
import { FEED, PRODUCT_ID } from "../../constants";
import { Order, Feeds, ProductIds } from "../../typings";

interface OrderFlowMessage {
  feed: Feeds;
  product_id: ProductIds;
  asks: Order[];
  bids: Order[];
}

function subscribe(to: ProductIds) {
  return JSON.stringify({ event: "subscribe", feed: "book_ui_1", product_ids: [to] });
}

function unsubscribe(to: ProductIds) {
  return JSON.stringify({ event: "unsubscribe", feed: "book_ui_1", product_ids: [to] });
}

function useOrderFlow() {
  const socket = useMemo(() => new WebSocket("wss://www.cryptofacilities.com/ws/v1"), []);
  const [activeFeed, setActiveFeed] = useState<ProductIds>(PRODUCT_ID.XBT_USD);

  function toggleFeed() {
    const nextFeed = activeFeed === PRODUCT_ID.XBT_USD ? PRODUCT_ID.ETH_USD : PRODUCT_ID.XBT_USD;

    socket.send(unsubscribe(activeFeed));
    socket.send(subscribe(nextFeed));

    setActiveFeed(nextFeed);
  }

  useEffect(() => {
    socket.addEventListener("open", (event) => {
      console.log("Socket opened", event);
      socket.send(JSON.stringify({ event: "subscribe", feed: "book_ui_1", product_ids: ["PI_XBTUSD"] }));
    });

    socket.addEventListener("message", (event) => {
      const message: OrderFlowMessage = JSON.parse(event.data);

      switch (message.feed) {
        case FEED.DELTA: {
          console.log("Delta ask: ", message.asks);
          console.log("Delta bid: ", message.bids);
          break;
        }

        case FEED.SNAPSHOT: {
          console.log("Snapshot: ", message);
          break;
        }
      }
    });

    socket.addEventListener("error", (event) => {
      console.log("Socket error", event);
    });

    socket.addEventListener("close", (event) => {
      console.log("Socket closed", event);
    });

    return socket.close;
  }, []);

  return { activeFeed, toggleFeed };
}

export default function OrderBook(): React.ReactElement | null {
  const { activeFeed, toggleFeed } = useOrderFlow();
  return (
    <div>
      <h1>{activeFeed}</h1>
      <button onClick={toggleFeed}>Toggle Feed</button>
    </div>
  );
}
