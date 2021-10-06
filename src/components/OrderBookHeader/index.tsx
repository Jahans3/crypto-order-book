import React from "react";
import OrderBookSpread from "../OrderBookSpread";
import { Container, Title } from "./styled";
import { MOBILE_BREAKPOINT } from "../../constants";

export default function OrderBookHeader(): React.ReactElement {
  const isMobile = window.innerWidth <= MOBILE_BREAKPOINT;
  return (
    <Container>
      <Title>Order Book</Title>
      {!isMobile && <OrderBookSpread />}
    </Container>
  );
}
