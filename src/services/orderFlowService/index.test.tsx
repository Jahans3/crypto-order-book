import { testRoot, RecoilObserver } from "../../testUtils";
import * as orderFlowService from "./index";
import { workerAtom, workerMessagesAtom } from "../../state/orderFlowAtoms";

const worker = {
  postMessage: () => null,
  terminate: () => null,
  addEventListener: () => null,
  removeEventListener: () => null,
};

jest.mock(
  "worker-loader!../../workers/orderFlowWorker/index.ts",
  () =>
    function () {
      return worker;
    }
);
/*
function () {
      this.postMessage = () => null;
      this.terminate = () => null;
      this.addEventListener = () => null;
      this.removeEventListener = () => null;
      return "worker";
    }
 */

function TestComponent() {
  orderFlowService.useOrderFlow();
  return null;
}

describe("orderFlowService", () => {
  test("it correctly assigns the worker and worker message functions to recoil state", () => {
    // Double cast from strings so we can easily inspect changes
    // Unknown is necessary so TS doesn't complain about no overlap in types
    // jest.spyOn(orderFlowService, "initWorker").mockImplementation(() => ({
    //   worker: "worker" as unknown as Worker,
    //   wakeWorker: "wakeWorker" as unknown as () => void,
    //   sleepWorker: "sleepWorker" as unknown as () => void,
    //   toggleProduct: "toggleProduct" as unknown as () => void,
    // }));

    const onWorkerUpdate = jest.fn();
    const onWorkerMessagesUpdate = jest.fn();

    testRoot(
      <>
        <RecoilObserver atom={workerAtom} onUpdate={onWorkerUpdate} />
        <RecoilObserver atom={workerMessagesAtom} onUpdate={onWorkerMessagesUpdate} />
        <TestComponent />
      </>
    );

    expect(onWorkerUpdate).toHaveBeenCalledWith(worker);
    expect(onWorkerUpdate).toHaveBeenCalledTimes(2);
    expect(onWorkerMessagesUpdate).toHaveBeenCalled();
    expect(onWorkerMessagesUpdate).toHaveBeenCalledTimes(2);
  });
});
