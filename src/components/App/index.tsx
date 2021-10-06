import React from "react";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import OrderBook from "../OrderBook";
import OrderBookFeed from "../OrderBookFeed";
import OrderBookHeader from "../OrderBookHeader";
import OrderBookFooter from "../OrderBookFooter";
import Notification from "../Notification";
import { THEME } from "../../theme";
import { ORDER_TYPE } from "../../constants";
import { Container } from "./styled";

export default function App(): React.ReactElement {
  return (
    <RecoilRoot>
      <ThemeProvider theme={THEME}>
        <Container>
          <OrderBookHeader />
          <OrderBook>
            <OrderBookFeed type={ORDER_TYPE.BID} />
            <OrderBookFeed type={ORDER_TYPE.ASK} />
          </OrderBook>
          <OrderBookFooter />
          <Notification />
        </Container>
      </ThemeProvider>
    </RecoilRoot>
  );
}
