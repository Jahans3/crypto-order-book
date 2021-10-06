import { updateDelta, getNewTotals, getSpread } from "./index";
import { Order, OrderTotal } from "../../typings";

describe("orderFlowWorker", () => {
  describe("getNewTotals", () => {
    test("it takes price/size pairs with an empty total and incrementally adds totals to each tuple", () => {
      const tuples: OrderTotal[] = [
        [1, 1, 0],
        [1.5, 2, 0],
        [2, 3, 0],
        [2.5, 4, 0],
        [3, 5, 0],
        [3.5, 6, 0],
        [4, 7, 0],
        [4.5, 8, 0],
        [5, 9, 0],
      ];

      const cumulativeTotals = getNewTotals(tuples);
      const expectedResult = [
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

      expect(cumulativeTotals).toEqual(expectedResult);
    });
  });

  describe("updateDelta", () => {
    test("it should remove any existing price levels if the delta contains the a matching price with zero size", () => {
      const existing: OrderTotal[] = [[1, 10, 10]];
      const delta: Order[] = [[1, 0]];
      const updated = updateDelta(delta, existing, "asc");

      expect(updated).toEqual([]);
    });

    test("it should update the size and total of any existing price levels if the delta contains a matching price with a different size", () => {
      const existing: OrderTotal[] = [[1, 10, 10]];
      const delta: Order[] = [[1, 5]];
      const updated = updateDelta(delta, existing, "asc");
      const expectedResult = [[1, 5, 5]];
      expect(updated).toEqual(expectedResult);
    });

    test("it should sort by ascending price when `asc` is passed", () => {
      const existing: OrderTotal[] = [[5, 10, 10]];
      const delta: Order[] = [
        [1, 5],
        [3, 8],
        [4, 20],
      ];
      const updated = updateDelta(delta, existing, "asc");
      const expectedResult = [
        [1, 5, 5],
        [3, 8, 13],
        [4, 20, 33],
        [5, 10, 43],
      ];

      expect(updated).toEqual(expectedResult);
    });

    test("it should sort by descending price when `desc` is passed", () => {
      const existing: OrderTotal[] = [[5, 10, 10]];
      const delta: Order[] = [
        [1, 5],
        [3, 8],
        [4, 20],
      ];
      const updated = updateDelta(delta, existing, "desc");
      const expectedResult = [
        [5, 10, 10],
        [4, 20, 30],
        [3, 8, 38],
        [1, 5, 43],
      ];

      expect(updated).toEqual(expectedResult);
    });
  });

  describe("getSpread", () => {
    test("it calculates the spread value and spread percentage of the given bid and ask states", () => {
      const asks: OrderTotal[] = [
        [6, 10, 10],
        [5, 5, 15],
        [4.5, 3, 18],
        [3, 9, 27],
      ];
      const bids: OrderTotal[] = [
        [5, 10, 10],
        [4, 20, 30],
        [3, 8, 38],
        [1, 5, 43],
      ];
      const { spreadNum, spreadPercent } = getSpread(asks, bids);

      expect(spreadNum).toEqual(1);
      expect(spreadPercent.toFixed(2)).toEqual("18.18");
    });
  });
});
