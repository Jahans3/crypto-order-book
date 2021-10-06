import styled from "styled-components";
import { OrderType } from "../../typings";
import { ORDER_TYPE } from "../../constants";
import { useIsMobile } from "../../utils";

export const Container = styled.div<{ type: OrderType }>`
  ${(props) => {
    const isMobile = useIsMobile();

    if (props.type === ORDER_TYPE.ASK && isMobile) {
      return `
        transform: scaleX(-1) scaleY(-1) translateX(0px);
        height: 100%;
      `;
    }

    if (props.type === ORDER_TYPE.BID && isMobile) {
      return `
        transform: scaleX(-1) translateX(0px);
        height: 100%;
      `;
    }

    if (props.type === ORDER_TYPE.ASK) {
      return `
        transform: scaleX(-1) translateX(0px);
        height: 100%;
      `;
    }
  }}
`;

export const SVGRoot = styled.svg`
  position: absolute;
  bottom: 0;
  height: calc(100% - 27px); // Header height = 27px
  width: 100%;
`;
