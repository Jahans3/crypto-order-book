import React from "react";
import { OrderType } from "../../typings";
import { ORDER_TYPE } from "../../constants";
import { Td } from "./styled";
import { getIsMobile } from "../../utils";

function formatThousands(number: number, options?: { minimumFractionDigits: number }): string {
  return new Intl.NumberFormat("en-EN", options).format(number);
}

interface RowProps {
  type: OrderType;
  total: number;
  size: number;
  price: number;
}

export default function Row({ type, total, size, price }: RowProps): React.ReactElement {
  const formattedTotal = formatThousands(total);
  const formattedSize = formatThousands(size);
  const formattedPrice = formatThousands(price, { minimumFractionDigits: 2 });
  const isMobile = getIsMobile();
  return type === ORDER_TYPE.BID && !isMobile ? (
    <tr>
      <Td end="left">{formattedTotal}</Td>
      <Td>{formattedSize}</Td>
      <Td type={type}>{formattedPrice}</Td>
    </tr>
  ) : (
    <tr>
      <Td type={type}>{formattedPrice}</Td>
      <Td>{formattedSize}</Td>
      <Td end="right">{formattedTotal}</Td>
    </tr>
  );
}
