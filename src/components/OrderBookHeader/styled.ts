import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  background: ${(props) => props.theme.main};
  border: 3px solid ${(props) => props.theme.secondary};
  width: calc(100% - 6px);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
`;

export const Title = styled.span`
  position: absolute;
  left: 0;
  color: ${(props) => props.theme.text.light};
  font-family: ${(props) => props.theme.font};
  justify-self: flex-start;
  margin: 12px 18px;
`;
