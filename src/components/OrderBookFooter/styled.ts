import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
`;

export const ToggleButton = styled.button`
  width: 120px;
  height: 34px;
  border-radius: 5px;
  outline: none;
  color: ${(props) => props.theme.text.light};
  border: 0;
  background-color: ${(props) => props.theme.contrast};
`;
