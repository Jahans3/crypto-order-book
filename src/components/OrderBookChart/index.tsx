import React, { useEffect, useRef, memo } from "react";
import drawChart from "./chart";
import { Container, SVGRoot } from "./styled";
import { OrderTotal, OrderType } from "../../typings";

interface Props {
  type: OrderType;
  numRows: number;
  feed: OrderTotal[];
}

function OrderBookChart({ type, numRows, feed }: Props): React.ReactElement {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => drawChart(feed.slice(0, numRows), svgRef.current, type), [feed, numRows, type]);

  return (
    <Container type={type}>
      <SVGRoot ref={svgRef} className={`chart-${type}`} />
    </Container>
  );
}

export default memo(OrderBookChart);
