import React from "react";
import CustomButton from "../CustomButton/CustomButton";
import {ButtonContainer, Container2, DoneContainer, TitleContainer} from "./style";

const ReadTodo = ({todo,toggleUpdate}) =>{
  return(
    <>
        <TitleContainer>
          <DoneContainer done={todo?.done}>{todo?.done ? "완료" : "미완료"}</DoneContainer>
          <h1>{todo?.title}</h1>
        </TitleContainer>
      <Container2><h4>{todo?.content}</h4></Container2>
      <ButtonContainer>
          <CustomButton theme={'type1'} size={'medium'} onClick={toggleUpdate}>수정하기</CustomButton>
      </ButtonContainer>
    </>
  )
}

export default ReadTodo