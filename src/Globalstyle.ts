import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    list-style: none;
    font-family: 'Noto Sans KR', sans-serif;
    color: ${(props) => props.theme.colors.text};

  }

  #root {

    height: 100dvh;
    padding: 25px;
    background: url("/bg.jpg") no-repeat center center/cover;
    background-attachment: fixed;
  position: relative;

  }

`;
