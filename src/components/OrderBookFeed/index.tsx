import React, { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { askFeedAtom, bidFeedAtom } from "../../state/orderFlowAtoms";
import { OrderType } from "../../typings";
import { ORDER_TYPE } from "../../constants";
import { Td, THead, Table } from "./styled";

const orderTypeStateMap = {
  [ORDER_TYPE.BID]: bidFeedAtom,
  [ORDER_TYPE.ASK]: askFeedAtom,
};

function formatThousands(number: number, options?: { minimumFractionDigits: number }): string {
  return new Intl.NumberFormat("en-EN", options).format(number);
}

interface Props {
  type: OrderType;
}

function Headers({ type }: Props) {
  return type === ORDER_TYPE.BID ? (
    <>
      <THead colSpan={1} end="left">
        TOTAL
      </THead>
      <THead colSpan={1}>SIZE</THead>
      <THead colSpan={1}>PRICE</THead>
    </>
  ) : (
    <>
      <THead colSpan={1}>PRICE</THead>
      <THead colSpan={1}>SIZE</THead>
      <THead colSpan={1} end="right">
        TOTAL
      </THead>
    </>
  );
}

interface RowProps extends Props {
  total: number;
  size: number;
  price: number;
}

function Row({ type, total, size, price }: RowProps) {
  const formattedTotal = formatThousands(total);
  const formattedSize = formatThousands(size);
  const formattedPrice = formatThousands(price, { minimumFractionDigits: 2 });
  return type === ORDER_TYPE.BID ? (
    <tr>
      <Td end="left">{formattedTotal}</Td>
      <Td>{formattedSize}</Td>
      <Td type="bid">{formattedPrice}</Td>
    </tr>
  ) : (
    <tr>
      <Td type="ask">{formattedPrice}</Td>
      <Td>{formattedSize}</Td>
      <Td end="right">{formattedTotal}</Td>
    </tr>
  );
}

export default function OrderBookFeed({ type }: Props): React.ReactElement | null {
  const tableRef = useRef<HTMLTableElement>(null);
  const feed = useRecoilValue(orderTypeStateMap[type]);
  const [numRows, setNumRows] = useState<number>(50);

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
    <Table ref={tableRef}>
      <thead>
        <tr>
          <Headers type={type} />
        </tr>
      </thead>
      <tbody>
        {feed.slice(0, numRows).map(([price, size, total]) => (
          <Row key={total} type={type} price={price} size={size} total={total} />
        ))}
      </tbody>
    </Table>
  );
}
