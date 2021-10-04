import React from "react";
import { useOrderFlow } from "../../services/orderFlowService";
import { Container } from "./styled";

interface Props {
  children: React.ReactNode;
}

export default function OrderBook({ children }: Props): React.ReactElement {
  useOrderFlow();
  return <Container>{children}</Container>;
}
