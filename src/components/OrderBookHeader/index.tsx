import React from "react";
import OrderBookSpread from "../OrderBookSpread";
import { Container, Title } from "./styled";
import { useIsMobile } from "../../utils";

export default function OrderBookHeader(): React.ReactElement {
  const isMobile = useIsMobile();
  return (
    <Container>
      <Title>Order Book</Title>
      {!isMobile && <OrderBookSpread />}
    </Container>
  );
}
