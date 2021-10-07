import React from "react";
import { useOrderFlow } from "../../services/orderFlowService";
import { Container } from "./styled";

interface Props {
  children: React.ReactNode;
}

export default function OrderBook({ children }: Props): React.ReactElement {
  useOrderFlow();
  // const ref = React.useRef<HTMLDivElement>(null);
  // React.useEffect(() => {
  //   const { height } = ref.current?.getBoundingClientRect() ?? {};
  //   console.log({ parentHeight: height });
  // }, [ref]);
  return <Container>{children}</Container>;
}
