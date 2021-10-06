import React from "react";
import { useRecoilValue } from "recoil";
import { spreadAtom } from "../../state/orderFlowAtoms";
import { Container, Title, Spread } from "./styled";

export default function OrderBookHeader(): React.ReactElement {
  const { spreadNum, spreadPercent } = useRecoilValue(spreadAtom);
  return (
    <Container>
      <Title>Order Book</Title>
      <Spread>
        Spread: {spreadNum.toFixed(2)} ({spreadPercent.toFixed(2)}%)
      </Spread>
    </Container>
  );
}
