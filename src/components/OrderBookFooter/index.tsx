import React from "react";
import { Container, ToggleButton } from "./styled";

export default function OrderBookFooter(): React.ReactElement {
  return (
    <Container>
      <ToggleButton>Toggle Feed</ToggleButton>
    </Container>
  );
}
