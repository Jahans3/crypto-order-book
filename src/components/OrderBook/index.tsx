import React, { useEffect, useMemo, useState } from "react";
import { useOrderFlow } from "../../services/orderFlowService";
import { FEED, PRODUCT_ID } from "../../constants";
import { Order, Feeds, ProductIds } from "../../typings";

interface OrderFlowMessage {
  feed: Feeds;
  product_id: ProductIds;
  asks: Order[];
  bids: Order[];
}

export default function OrderBook(): React.ReactElement | null {
  const { activeProduct, toggleFeed } = useOrderFlow();
  return (
    <div>
      <h1>{activeProduct}</h1>
      <button onClick={toggleFeed}>Toggle Feed</button>
    </div>
  );
}
