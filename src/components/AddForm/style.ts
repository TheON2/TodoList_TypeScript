import styled from "styled-components";

export const Form = styled.form`
  background-color: #eee;
  border-radius: 12px;
  justify-content: space-between;
  margin: 0 auto;
  padding: 30px;
  align-items: center;
  display: flex;
  gap: 20px;
`;

export const InputGroup = styled.div`
  align-items: center;
  display: flex;
  gap: 20px
`;

export const Input = styled.input`
  border: none;
  border-radius: 12px;
  height: 40px;
  padding: 0 12px;
  width: 240px;
`;

export const InputContent = styled.input`
  border: none;
  border-radius: 12px;
  height: 40px;
  padding: 0 12px;
  width: 550px;
`;

export const Button = styled.button`
  background-color: teal;
  border: none;
  border-radius: 10px;
  color: #fff;
  font-weight: 700;
  height: 40px;
  width: 140px;
`;

export const Label = styled.label`
  font-size: 16px;
  font-weight: 700;
`;
