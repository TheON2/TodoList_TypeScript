import styled, {createGlobalStyle} from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *{
    box-sizing: content-box!important;
  }
  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    margin: 0;
    box-sizing: content-box!important;
  }
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, Courier New, monospace
  }
  .ReactModal__Body--open,
  .ReactModal__Html--open{
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    margin: 0;
    background: none;
    box-sizing: content-box !important;
    height: auto;
    h2{
      text-align: left!important;
    }
  }
`;

export const Parent = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MainContainer = styled.div`
  display: grid;
  grid-template-columns: 3fr 0.5fr 6.5fr;
  grid-template-rows: 1200px 1fr;
  align-content: center;
`;

export const TotalContainer = styled.div`
  border-radius: 12px;
  padding: 12px 24px 24px;
  width: 270px;
  height: 100%;
  box-shadow: 0 14px 28px rgba(0,0,0,0.25),
  0 10px 10px rgba(0,0,0,0.22);
  margin-top: 15px;
`;

export const LayOut = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  min-width: 800px;
  height: 800px;
`;
