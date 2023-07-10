import styled from "styled-components";

const IconButton = styled.button`
  background: none;
  border: none;
  font-size: 2rem; // 아이콘 크기를 조절
  cursor: pointer;
  color: ${(props) => (props.selected ? "blue" : "black")};
  &:hover {
    color: blue;
  }
`;


export const ListContainer = styled.div`
  display: grid;
  grid-column: 3;
  grid-row: 1;
  align-content: start;
  width: 100%;
  height: 100%;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none; 
`;

export const TodoContainer = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
  height: 100%;
  flex-wrap: wrap;
`;
