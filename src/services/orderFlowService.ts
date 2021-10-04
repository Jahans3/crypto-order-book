import Worker from "worker-loader!../workers/orderFlowWorker";
import { useEffect, useMemo } from "react";
import { useSetRecoilState } from "recoil";
import { spreadAtom, bidFeed, askFeed } from "../state/orderFlow";
import { WORKER_MESSAGES } from "../constants";
import { OrderData, WorkerMessages, OrderFlowHook } from "../typings";

function initWorker() {
  const worker = new Worker();

  function postMessage(message: WorkerMessages) {
    return () => worker.postMessage({ message });
  }

  const sleepWorker = postMessage(WORKER_MESSAGES.SLEEP);
  const wakeWorker = postMessage(WORKER_MESSAGES.WAKE);
  const closeWorker = postMessage(WORKER_MESSAGES.CLOSE);
  const toggleProduct = postMessage(WORKER_MESSAGES.TOGGLE_PRODUCT);

  window.addEventListener("beforeunload", closeWorker);

  return {
    worker,
    sleepWorker,
    wakeWorker,
    toggleProduct,
  };
}

export function useOrderFlow(): OrderFlowHook {
  const { worker, sleepWorker, wakeWorker, toggleProduct } = useMemo(initWorker, []);
  const setSpread = useSetRecoilState(spreadAtom);
  const setBidFeed = useSetRecoilState(bidFeed);
  const setAskFeed = useSetRecoilState(askFeed);

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      const { spread, asks, bids } = event.data as OrderData;

      setSpread(spread);
      setAskFeed(asks);
      setBidFeed(bids);
    }

    worker.addEventListener("message", handleMessage);

    return () => {
      worker.terminate();
      worker.removeEventListener("message", handleMessage);
    };
  }, [worker, setSpread, setAskFeed, setBidFeed]);

  return { sleepWorker, wakeWorker, toggleProduct };
}
