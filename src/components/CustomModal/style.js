import styled, {createGlobalStyle} from "styled-components";
import Modal from 'react-modal';
import {Link as OriginalLink} from "react-router-dom";

export const StyledModal = styled(Modal)`
  width: ${({ size }) => (size === 'large' ? '70%' : '50%')};
  height: ${({ size }) => (size === 'large' ? '70%' : '50%')};
`;

export const StyledH4 = styled.a`
  color: gray;
  text-decoration: none;
  transition: color 0.3s ease-in-out;
  font-weight: bold;
  &:hover {
    color: lightgreen;
  }
`;

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Montserrat:400,800');

  * {
    box-sizing: border-box;
  }

  body {
    background: #f6f5f7;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-family: 'Montserrat', sans-serif;
    height: 100vh;
    margin: -20px 0 50px;
  }

  h1 {
    font-weight: bold;
    margin: 0;
  }

  h2 {
    text-align: center;
  }

  p {
    font-size: 14px;
    font-weight: 100;
    line-height: 20px;
    letter-spacing: 0.5px;
    margin: 20px 0 30px;
  }

  span {
    font-size: 12px;
  }

  a {
    color: #333;
    font-size: 14px;
    text-decoration: none;
    margin: 15px 0;
  }
`;

export const Container = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0,0,0,0.25),
  0 10px 10px rgba(0,0,0,0.22);
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  height: 100%;
`;

export const Linker = styled.a`
  display: grid;
  grid-column: 1/3;
  grid-row: 1/2;
  alignItems: center;
  gap:10px;
  text-decoration: none;
  color: inherit;
`;

export const Container2 = styled.div`
  background-color: gray;
  border-radius: 12px;
  justify-content: space-between;
  margin: 0 auto;
  padding: 30px;
  display: flex;
  gap: 20px;
  width: 700%;
  height: 50%;
`;

export const TitleContainer = styled.div`
  align-items: center;
  display: flex;
  height: 50px;
  padding: 0 20px;
`;

export const DoneContainer = styled.div`
  align-items: center;
  border: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  background-color: ${props => props.done ? 'green' : 'red'};
`;
