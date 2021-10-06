import styled from "styled-components";

export const Button = styled.button`
  width: 120px;
  height: 34px;
  border-radius: 5px;
  outline: none;
  color: ${(props) => props.theme.text.light};
  border: 0;
  background-color: ${(props) => props.theme.contrast};
  cursor: pointer;
`;

export default Button;
