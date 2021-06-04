import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export const lightTheme = {
  fontColor: '#2c2c2c',
  bgColor: 'lightgray',
};

export const darkTheme = {
  bgColor: '#2c2c2c',
  fontColor: 'lightgray',
};

export const GlobalStyles = createGlobalStyle`
  ${reset}
  body {
    background-color: ${(props) => props.theme.bgColor};
  }
  
`;
