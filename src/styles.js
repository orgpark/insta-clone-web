import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export const lightTheme = {
  accentColor: '#0095f6',
  bgColor: '#fafafa',
  borderColor: 'rgb(219, 219, 219)',
  fontColor: 'rgb(38, 38, 38)',
};

export const darkTheme = {
  bgColor: '#2c2c2c',
  fontColor: 'lightgray',
};

export const GlobalStyles = createGlobalStyle`
  ${reset}
  input {
    all: unset
  }

  * {
    box-sizing: border-box;
  }
  
  body {
    background-color: ${(props) => props.theme.bgColor};
    font-size: 14px;
    font-family: 'Open Sans', sans-serif;
    color: ${(props) => props.theme.fontColor}
  }
`;
