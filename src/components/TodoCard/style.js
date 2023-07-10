import styled from "styled-components";
import { Link as OriginalLink } from 'react-router-dom';

export const ListWrapper = styled.div`
  gap: 12px;
`;

export const TodoContainer = styled.div`
  border-radius: 12px;
  padding: 12px 24px 24px;
  width: 270px;
  box-shadow: 0 14px 28px rgba(0,0,0,0.25),
  0 10px 10px rgba(0,0,0,0.22);
  height: 200px;
`;

export const ButtonSet = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 24px;
`;

export const CardSet = styled.div`
  height: 10%;
  background-color: red;
`;

export const GenericButton = styled.button`
  border: none;
  border-radius: 8px;
  cursor: pointer;
  height: 40px;
  width: 50%;
`;
export const StyledLink = styled(OriginalLink)`
  color: gray;
  text-decoration: none;
  transition: color 0.3s ease-in-out;
  font-weight: bold;
  &:hover {
    color: lightgreen;
  }
`;

export const DeleteButton = styled(GenericButton)`
  background-color: #fff;
  border: 2px solid red;
`;

export const CompleteButton = styled(GenericButton)`
  background-color: #fff;
  border: 2px solid green;
`;
