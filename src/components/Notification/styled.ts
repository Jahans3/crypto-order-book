import styled from "styled-components";

export const Container = styled.div`
  height: 120px;
  width: 240px;
  position: absolute;
  left: calc(50% - 120px);
  top: calc(50% - 60px);
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  z-index: 9;
  background-color: ${(props) => props.theme.main};
  border: 2px solid ${(props) => props.theme.white};
  border-radius: 10px;
`;

export const NotificationText = styled.span`
  color: ${(props) => props.theme.text.light};
  font-family: ${(props) => props.theme.font};
  font-size: 17px;
`;
