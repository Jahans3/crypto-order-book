import { ORDER_TYPE } from "../../constants";
import { THead } from "./styled";
import React from "react";
import { OrderType } from "../../typings";

interface Props {
  type: OrderType;
}

export default function Headers({ type }: Props): React.ReactElement {
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
