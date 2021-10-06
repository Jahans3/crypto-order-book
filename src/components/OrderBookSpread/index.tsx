import React from "react";
import { useRecoilValue } from "recoil";
import { spreadAtom } from "../../state/orderFlowAtoms";
import { Spread } from "./styled";

export default function OrderBookSpread(): React.ReactElement {
  const { spreadNum, spreadPercent } = useRecoilValue(spreadAtom);
  return (
    <Spread>
      Spread: {spreadNum.toFixed(2)} ({spreadPercent.toFixed(2)}%)
    </Spread>
  );
}
