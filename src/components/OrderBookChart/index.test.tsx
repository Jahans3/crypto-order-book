import { testRoot } from "../../testUtils";
import drawChart from "./chart";
import OrderBookChart from "./index";
import { ORDER_TYPE } from "../../constants";
import * as utils from "../../utils";
import * as testIds from "./testIds";
import "@testing-library/jest-dom/extend-expect";

jest.mock("./chart", () => jest.fn());

const props = {
  type: ORDER_TYPE.BID,
  numRows: 25,
  feed: [],
};

describe("OrderBookChart", () => {
  test("it calls the chart render function", () => {
    testRoot(<OrderBookChart {...props} />);

    expect(drawChart).toHaveBeenCalled();
  });

  test("ask feed in mobile mode applies transform properties correctly", () => {
    jest.spyOn(utils, "useIsMobile").mockImplementationOnce(() => true);

    const { queryByTestId } = testRoot(<OrderBookChart {...props} type={ORDER_TYPE.ASK} />);
    const container = queryByTestId(testIds.container);

    expect(container).toHaveStyle("transform: scaleX(-1) scaleY(-1) translateX(0px)");
  });

  test("bid feed in mobile mode applies transform properties correctly", () => {
    jest.spyOn(utils, "useIsMobile").mockImplementationOnce(() => true);

    const { queryByTestId } = testRoot(<OrderBookChart {...props} type={ORDER_TYPE.BID} />);
    const container = queryByTestId(testIds.container);

    expect(container).toHaveStyle("transform: scaleX(-1) translateX(0px)");
  });

  test("ask feed in desktop mode applies transform properties correctly", () => {
    jest.spyOn(utils, "useIsMobile").mockImplementationOnce(() => false);

    const { queryByTestId } = testRoot(<OrderBookChart {...props} type={ORDER_TYPE.ASK} />);
    const container = queryByTestId(testIds.container);

    expect(container).toHaveStyle("transform: scaleX(-1) translateX(0px)");
  });
});
