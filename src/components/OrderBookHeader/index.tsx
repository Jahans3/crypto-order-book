import React from "react";
import { useRecoilValue } from "recoil";
import { spreadAtom } from "../../state/orderFlow";
import { Container, Title, Spread } from "./styled";

export default function OrderBookHeader(): React.ReactElement {
  const { spreadNum, spreadPercent } = useRecoilValue(spreadAtom);
  return (
    <Container>
      <Title>Order Book</Title>
      <Spread>
        Spread: {spreadNum} ({spreadPercent.toFixed(2)})
      </Spread>
    </Container>
  );
}
