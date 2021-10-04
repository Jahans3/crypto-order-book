import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  background-color: ${(props) => props.theme.main};
`;
