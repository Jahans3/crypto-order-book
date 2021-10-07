import { ORDER_TYPE } from "../../constants";
import { THead } from "./styled";
import React from "react";
import { OrderType } from "../../typings";
import * as testIds from "./testIds";

interface Props {
  type: OrderType;
}

export default function Headers({ type }: Props): React.ReactElement {
  return type === ORDER_TYPE.BID ? (
    <>
      <THead colSpan={1} data-testid={testIds.headerTotal}>
        TOTAL
      </THead>
      <THead colSpan={1}>SIZE</THead>
      <THead colSpan={1}>PRICE</THead>
    </>
  ) : (
    <>
      <THead colSpan={1}>PRICE</THead>
      <THead colSpan={1}>SIZE</THead>
      <THead colSpan={1} data-testid={testIds.headerTotal}>
        TOTAL
      </THead>
    </>
  );
}
