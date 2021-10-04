import Worker from "worker-loader!../workers/orderFlowWorker";
import { useEffect, useMemo } from "react";
import { useSetRecoilState } from "recoil";
import { spreadAtom, bidFeedAtom, askFeedAtom, workerAtom, workerMessagesAtom } from "../state/orderFlowAtoms";
import { WORKER_MESSAGE } from "../constants";
import { OrderData, WorkerMessages } from "../typings";

function initWorker() {
  const worker = new Worker();

  function postMessage(message: WorkerMessages) {
    return () => worker.postMessage({ message });
  }

  const sleepWorker = postMessage(WORKER_MESSAGE.SLEEP);
  const wakeWorker = postMessage(WORKER_MESSAGE.WAKE);
  const closeWorker = postMessage(WORKER_MESSAGE.CLOSE);
  const toggleProduct = postMessage(WORKER_MESSAGE.TOGGLE_PRODUCT);

  window.addEventListener("beforeunload", closeWorker);

  return {
    worker,
    sleepWorker,
    wakeWorker,
    toggleProduct,
  };
}

export function useOrderFlow(): void {
  const { worker, sleepWorker, wakeWorker, toggleProduct } = useMemo(initWorker, []);
  const setWorker = useSetRecoilState(workerAtom);
  const setWorkerMessages = useSetRecoilState(workerMessagesAtom);
  const setSpread = useSetRecoilState(spreadAtom);
  const setBidFeed = useSetRecoilState(bidFeedAtom);
  const setAskFeed = useSetRecoilState(askFeedAtom);

  useEffect(() => {
    setWorker(worker);
    setWorkerMessages({ sleepWorker, wakeWorker, toggleProduct });

    function handleMessage(event: MessageEvent) {
      const { spread, asks, bids } = event.data as OrderData;

      setSpread(spread);
      setAskFeed(asks);
      setBidFeed(bids);
    }

    worker.addEventListener("message", handleMessage);

    return () => {
      setWorker(undefined);
      setWorkerMessages(undefined);

      worker.terminate();
      worker.removeEventListener("message", handleMessage);
    };
  }, []);
}
