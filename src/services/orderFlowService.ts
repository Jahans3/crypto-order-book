import Worker from "worker-loader!../workers/orderFlowWorker";
import { useEffect, useMemo } from "react";
import { useSetRecoilState } from "recoil";
import { spreadAtom, bidFeed, askFeed } from "../state/orderFlow";
import { OrderData } from "../typings";

export function useOrderFlow(): void {
  const worker = useMemo(() => new Worker(), []);
  const setSpread = useSetRecoilState(spreadAtom);
  const setBidFeed = useSetRecoilState(bidFeed);
  const setAskFeed = useSetRecoilState(askFeed);

  useEffect(() => {
    worker.addEventListener("message", (event) => {
      const { spread, asks, bids } = event.data as OrderData;

      setSpread(spread);
      setAskFeed(asks);
      setBidFeed(bids);
    });

    return worker.terminate;
  }, [worker]);
}
