import React from "react";
import { Container } from "./styled";
import Button from "../Button";
import { useRecoilValue } from "recoil";
import { workerMessagesAtom } from "../../state/orderFlowAtoms";
import * as testIds from "./testIds";

export default function OrderBookFooter(): React.ReactElement {
  const { toggleProduct = () => null } = useRecoilValue(workerMessagesAtom) ?? {};
  return (
    <Container>
      <Button onClick={toggleProduct} data-testid={testIds.toggleButton}>
        Toggle Feed
      </Button>
    </Container>
  );
}
