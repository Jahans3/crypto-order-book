import styled from "styled-components";
import { OrderType } from "../../typings";

export const Table = styled.table`
  width: 50%;
  background-color: ${(props) => props.theme.main};
`;

export const THead = styled.th<{ end?: "left" | "right" }>`
  height: 24px;
  width: 33%;
  color: ${(props) => props.theme.text.dark};
  text-align: right;
  border-bottom: 1px solid ${(props) => props.theme.secondary};
  font-family: ${(props) => props.theme.font};
  font-size: 12px;
  font-weight: 400;
  ${(props) => {
    const { end } = props;

    if (!end) return;

    return end === "left" ? "padding-left: 10%;" : "padding-right: 10%;";
  }}
`;

export const Td = styled.td<{ type?: OrderType; end?: "left" | "right" }>`
  height: 20px;
  width: 33%;
  text-align: right;
  font-family: monospace;
  color: ${(props) => {
    const {
      type,
      theme: { text },
    } = props;
    if (!type) return props.theme.text.light;

    return type === "bid" ? text.green : text.red;
  }};
  ${(props) => {
    const { end } = props;

    if (!end) return;

    return end === "left" ? "padding-left: 10%;" : "padding-right: 10%;";
  }}
`;