import React from "react";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import OrderBook from "../OrderBook";
import OrderBookHeader from "../OrderBookHeader";
import { THEME } from "../../theme";

export default function App(): React.ReactElement {
  return (
    <RecoilRoot>
      <ThemeProvider theme={THEME}>
        <OrderBookHeader />
        <OrderBook />
      </ThemeProvider>
    </RecoilRoot>
  );
}
