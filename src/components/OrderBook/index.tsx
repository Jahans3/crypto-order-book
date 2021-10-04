import React from "react";
import { useOrderFlow } from "../../services/orderFlowService";
import { useRecoilValue } from "recoil";
import { askFeed, bidFeed } from "../../state/orderFlow";
import { THEME } from "../../theme";

const Cell = ({ value, highlight = "#000" }: { value: number | string; highlight?: string }) => (
  <span style={{ borderRight: "1px solid #fff", flexGrow: 1, width: 100, color: highlight }}>{value}</span>
);

export default function OrderBook(): React.ReactElement | null {
  const { sleepWorker } = useOrderFlow();

  const asks = useRecoilValue(askFeed);
  const bids = useRecoilValue(bidFeed);

  return (
    <div>
      <h1 onClick={sleepWorker}>Bookywooky</h1>
      <div style={{ display: "flex" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", justifyItems: "flex-start" }}>
          <div style={{ display: "flex", width: 300, justifyContent: "flex-start" }}>
            <Cell value="Total" />
            <Cell value="Size" />
            <Cell value="Price" />
          </div>
          {asks.slice(0, 50).map(([price, size, total]) => (
            <div key={`${price}${size}${total}`} style={{ display: "flex", width: 300, justifyContent: "flex-start" }}>
              <Cell value={total} />
              <Cell value={size} />
              <Cell value={price} highlight={THEME.text.red} />
            </div>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", justifyItems: "flex-start" }}>
          <div style={{ display: "flex", width: 300, justifyContent: "flex-start" }}>
            <Cell value="Price" />
            <Cell value="Size" />
            <Cell value="Total" />
          </div>
          {bids.slice(0, 50).map(([price, size, total]) => (
            <div key={`${price}${size}${total}`} style={{ display: "flex", width: 300, justifyContent: "flex-start" }}>
              <Cell value={price} highlight={THEME.text.green} />
              <Cell value={size} />
              <Cell value={total} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
