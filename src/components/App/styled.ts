import styled from "styled-components";

export const Container = styled.div`
  background-color: ${(props) => props.theme.main};
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
