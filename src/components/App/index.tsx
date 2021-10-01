import React from "react";
import { RecoilRoot } from "recoil";
import OrderBook from "../OrderBook";

export default function App(): React.ReactElement {
  return (
    <RecoilRoot>
      <div>hello</div>
      <OrderBook />
    </RecoilRoot>
  );
}
