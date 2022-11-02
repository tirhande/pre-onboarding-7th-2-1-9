import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

export const GlobalStyle = createGlobalStyle`
  ${normalize}
  
  * {
    box-sizing: border-box;
    font-family: 'Inter';
  }

  html {
    height: 100%;
  }
  body {
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;

    > div, > div > div {
      height: 100%;
    }
  }
  p {
    margin: 0;
  }
  @media (min-width: 450px) {
    html {
      max-width: 450px;
      margin: 0 auto;
    }
  }
`;
