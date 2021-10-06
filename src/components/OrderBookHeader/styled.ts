import styled from "styled-components";

export const Container = styled.div`
  background: ${(props) => props.theme.main};
  border: 3px solid ${(props) => props.theme.secondary};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const Title = styled.span`
  color: ${(props) => props.theme.text.light};
  font-family: ${(props) => props.theme.font};
  justify-self: flex-start;
  margin: 12px 18px;
  width: 35%;
`;
