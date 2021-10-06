import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  width: 100vw;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  background-color: ${(props) => props.theme.main};

  @media only screen and ${(props) => props.theme.mobileBreakpoint} {
    flex-direction: column-reverse;
  }
`;
