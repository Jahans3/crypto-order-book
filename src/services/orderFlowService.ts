import Worker from "worker-loader!../workers/orderFlowWorker";
import { useEffect, useMemo } from "react";
import { useSetRecoilState } from "recoil";
import { spreadAtom, bidFeedAtom, askFeedAtom, workerAtom, workerMessagesAtom } from "../state/orderFlowAtoms";
import { NOTIFICATION_STATUS, WORKER_MESSAGE } from "../constants";
import { OrderData, WorkerMessages } from "../typings";
import {
  notificationMessageAtom,
  notificationStatusAtom,
  notificationUptimeAtom,
  onNotificationCloseAtom,
} from "../state/notification";

// TS DOM lib does not support browser-specific properties so copy document and add to it's type def
type TDocument = Document & { webkitHidden?: boolean };

interface VisibilityChangeEvents {
  visibilityHidden: "webkitHidden" | "hidden";
  visibilityChange: "webkitvisibilitychange" | "visibilitychange";
}

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

function getVisibilityChangeEvents(): VisibilityChangeEvents {
  const doc: TDocument = document;

  if (doc.webkitHidden !== undefined) {
    return {
      visibilityHidden: "webkitHidden",
      visibilityChange: "webkitvisibilitychange",
    };
  }

  return {
    visibilityHidden: "hidden",
    visibilityChange: "visibilitychange",
  };
}

export function useOrderFlow(): void {
  const { worker, sleepWorker, wakeWorker, toggleProduct } = useMemo(initWorker, []);
  const setWorkerMessages = useSetRecoilState(workerMessagesAtom);
  const setWorker = useSetRecoilState(workerAtom);
  const setSpread = useSetRecoilState(spreadAtom);
  const setBidFeed = useSetRecoilState(bidFeedAtom);
  const setAskFeed = useSetRecoilState(askFeedAtom);
  const setNotificationMessage = useSetRecoilState(notificationMessageAtom);
  const setNotificationStatus = useSetRecoilState(notificationStatusAtom);
  const setNotificationUptime = useSetRecoilState(notificationUptimeAtom);
  const setOnNotificationClose = useSetRecoilState(onNotificationCloseAtom);

  useEffect(() => {
    setWorker(worker);
    setWorkerMessages({ sleepWorker, wakeWorker, toggleProduct });

    function handleMessage(event: MessageEvent) {
      const { activeProductUpdated } = event.data;

      if (activeProductUpdated) {
        setNotificationMessage(`Feed updated: ${activeProductUpdated.replace("PI_", "")}`);
        setNotificationStatus(NOTIFICATION_STATUS.VISIBLE);
        return;
      }

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

    // We can be sure that our Recoil functions and worker will not change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const { visibilityChange } = getVisibilityChangeEvents();

    function handleVisibilityChange() {
      const doc: TDocument = document;
      const { visibilityHidden } = getVisibilityChangeEvents();

      if (doc[visibilityHidden]) {
        sleepWorker();
        setOnNotificationClose(() => wakeWorker);
        setNotificationUptime(999999);
        setNotificationMessage("App was paused in background. Press OK to resume.");
        setNotificationStatus(NOTIFICATION_STATUS.VISIBLE);
      }
    }

    document.addEventListener(visibilityChange, handleVisibilityChange);

    return () => document.removeEventListener(visibilityChange, handleVisibilityChange);

    // We can be sure that our Recoil functions and memoised worker message functions will not change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
