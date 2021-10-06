import { testRoot } from "../../testUtils";
import { fireEvent } from "@testing-library/react";
import { MutableSnapshot } from "recoil";
import { workerMessagesAtom } from "../../state/orderFlowAtoms";
import OrderBookFooter from "./index";
import * as testIds from "./testIds";

describe("OrderBookFooter", () => {
  test("it executes the toggle feed handler from recoil state when the button is clicked", () => {
    const toggleProduct = jest.fn();
    const initialisedState = (snap: MutableSnapshot) => {
      snap.set(workerMessagesAtom, { toggleProduct, wakeWorker: () => null, sleepWorker: () => null });
    };
    const { queryByTestId } = testRoot(<OrderBookFooter />, initialisedState);
    const toggleButton = queryByTestId(testIds.toggleButton);

    fireEvent.click(toggleButton as HTMLElement);

    expect(toggleProduct).toHaveBeenCalledTimes(1);
  });
});
