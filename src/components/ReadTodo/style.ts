import styled from "styled-components";

export const Container2 = styled.div`
  grid-column: 1/3;
  grid-row: 3/4;
  background-color: whitesmoke;
  border-radius: 12px;
  justify-content: space-between;
  margin: 0 auto;
  padding: 30px;
  display: flex;
  gap: 20px;
  width: 90%;
  height: 80%;
`;

export const TitleContainer = styled.div`
  grid-column: 1/3;
  grid-row: 2/3;
  align-items: center;
  display: flex;
  height: 50px;
  gap: 20px;
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

export const ButtonContainer = styled.div`
  grid-column: 1/3;
  grid-row: 4/5;
`;
