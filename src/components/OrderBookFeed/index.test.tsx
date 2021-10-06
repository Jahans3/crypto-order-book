import { screen } from "@testing-library/react";
import { testRoot } from "../../testUtils";
import OrderBookFeed from "./index";
import { MutableSnapshot } from "recoil";
import { askFeedAtom, bidFeedAtom } from "../../state/orderFlowAtoms";
import { OrderTotal } from "../../typings";
import { ORDER_TYPE } from "../../constants";
import { THEME } from "../../theme";
import * as testIds from "./testIds";
import "jest-styled-components";
import Row from "./Row";

jest.mock("../OrderBookChart/chart", () => jest.fn());

const feed: OrderTotal[] = [
  [1, 1, 1],
  [1.5, 2, 3],
  [2, 3, 6],
  [2.5, 4, 10],
  [3, 5, 15],
  [3.5, 6, 21],
  [4, 7, 28],
  [4.5, 8, 36],
  [5, 9, 45],
];

describe("OrderBookFeed", () => {
  test("it renders the headers correctly for bids", () => {
    const initialisedState = (snap: MutableSnapshot) => {
      snap.set(bidFeedAtom, feed);
    };
    testRoot(<OrderBookFeed type={ORDER_TYPE.BID} />, initialisedState);
    const totalCell = screen.queryByTestId(testIds.headerTotal);

    expect(totalCell).toHaveStyleRule("padding-left: 10%");
  });

  test("it renders the headers correctly for asks", () => {
    const initialisedState = (snap: MutableSnapshot) => {
      snap.set(bidFeedAtom, feed);
    };
    testRoot(<OrderBookFeed type={ORDER_TYPE.ASK} />, initialisedState);
    const totalCell = screen.queryByTestId(testIds.headerTotal);

    expect(totalCell).toHaveStyleRule("padding-rightt: 10%");
  });

  test("it renders the correct color for asks", () => {
    const initialisedState = (snap: MutableSnapshot) => {
      snap.set(askFeedAtom, feed);
    };
    const tree = testRoot(<Row type={ORDER_TYPE.ASK} total={3} size={2} price={1} />, initialisedState);
    const priceCell = tree.queryByTestId(testIds.price);

    expect(priceCell).toHaveStyleRule(`color: ${THEME.text.red}`);
  });

  test("it renders the correct color for bids", () => {
    const initialisedState = (snap: MutableSnapshot) => {
      snap.set(bidFeedAtom, feed);
    };
    const tree = testRoot(<Row type={ORDER_TYPE.BID} total={3} size={2} price={1} />, initialisedState);
    const priceCell = tree.queryByTestId(testIds.price);

    expect(priceCell).toHaveStyleRule(`color: ${THEME.text.green}`);
  });
});
