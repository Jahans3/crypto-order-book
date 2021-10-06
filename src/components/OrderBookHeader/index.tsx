import React from "react";
import OrderBookSpread from "../OrderBookSpread";
import { Container, Title } from "./styled";
import { getIsMobile } from "../../utils";

export default function OrderBookHeader(): React.ReactElement {
  const isMobile = getIsMobile();
  return (
    <Container>
      <Title>Order Book</Title>
      {!isMobile && <OrderBookSpread />}
    </Container>
  );
}
