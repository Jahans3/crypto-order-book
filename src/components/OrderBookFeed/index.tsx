import React, { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import OrderBookChart from "../OrderBookChart";
import Headers from "./Headers";
import Row from "./Row";
import { askFeedAtom, bidFeedAtom } from "../../state/orderFlowAtoms";
import { OrderType } from "../../typings";
import { ORDER_TYPE } from "../../constants";
import { Table, Container, Tr } from "./styled";
import OrderBookSpread from "../OrderBookSpread";
import { getIsMobile } from "../../utils";

const orderTypeStateMap = {
  [ORDER_TYPE.BID]: bidFeedAtom,
  [ORDER_TYPE.ASK]: askFeedAtom,
};

interface Props {
  type: OrderType;
}

export default function OrderBookFeed({ type }: Props): React.ReactElement | null {
  const tableRef = useRef<HTMLTableElement>(null);
  const feed = useRecoilValue(orderTypeStateMap[type]);
  const [numRows, setNumRows] = useState<number>(50);
  const isMobile = getIsMobile();

  useEffect(() => {
    function handleResize() {
      const bounds = tableRef.current?.getBoundingClientRect();

      if (bounds) {
        const { height } = bounds;
        const itemsToRender = Math.floor(height / 20); // Row height = 20px

        setNumRows(itemsToRender);
      }
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [tableRef]);

  return (
    <Container>
      <Table ref={tableRef}>
        <thead>
          <Tr>
            {type === ORDER_TYPE.BID && isMobile ? (
              <th colSpan={3}>
                <OrderBookSpread />
              </th>
            ) : (
              <Headers type={type} />
            )}
          </Tr>
        </thead>
        <tbody>
          {feed.slice(0, numRows).map(([price, size, total]) => (
            <Row key={total} type={type} price={price} size={size} total={total} />
          ))}
        </tbody>
      </Table>
      <OrderBookChart type={type} numRows={numRows} feed={feed} />
    </Container>
  );
}
