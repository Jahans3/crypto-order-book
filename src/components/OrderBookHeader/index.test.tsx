import { testRoot } from "../../testUtils";
import OrderBookHeader from "./index";
import * as utils from "../../utils";

describe("OrderBookHeader", () => {
  test("it renders the spread in desktop mode", () => {
    jest.spyOn(utils, "useIsMobile").mockImplementationOnce(() => false);

    const { queryByText } = testRoot(<OrderBookHeader />);
    const spread = queryByText(/Spread:/g);

    expect(spread).toBeTruthy();
  });

  test("it doesn't render the spread in mobile mode", () => {
    jest.spyOn(utils, "useIsMobile").mockImplementationOnce(() => true);

    const { queryByText } = testRoot(<OrderBookHeader />);
    const spread = queryByText(/Spread:/g);

    expect(spread).toBeNull();
  });
});
