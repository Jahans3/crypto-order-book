import React from "react";
import { RecoilRoot } from "recoil";
import Worker from "worker-loader!../../workers/orderflowWorker";
import OrderBook from "../OrderBook";

const worker = new Worker();

setTimeout(() => {
  console.log("Sent a message!");
  worker.postMessage("Hello!");
}, 3000);

worker.onmessage = (e) => {
  console.log("Got a message back!", e);
};

export default function App(): React.ReactElement {
  return (
    <RecoilRoot>
      <div>hello</div>
      <OrderBook />
    </RecoilRoot>
  );
}
