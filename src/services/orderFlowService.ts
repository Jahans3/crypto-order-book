import Worker from "worker-loader!../workers/orderFlowWorker";
import { useEffect, useMemo, useState } from "react";
import { PRODUCT_ID } from "../constants";
import { ProductIds, Order } from "../typings";

export function useOrderFlow() {
  const worker = useMemo(() => new Worker(), []);
  const [activeProduct, setActiveProduct] = useState<ProductIds>(PRODUCT_ID.XBT_USD);
  const [asks, setAsks] = useState<Order[]>([]);
  const [bids, setBidss] = useState<Order[]>([]);

  function toggleFeed() {
    const nextProduct = activeProduct === PRODUCT_ID.XBT_USD ? PRODUCT_ID.ETH_USD : PRODUCT_ID.XBT_USD;
    // TODO - tell worker to switch socket feed
    setActiveProduct(nextProduct);
  }

  useEffect(() => {
    worker.addEventListener("message", (event) => {
      console.log(event.data);
    });
    return worker.terminate;
  }, [worker]);

  return { activeProduct, toggleFeed };
}
