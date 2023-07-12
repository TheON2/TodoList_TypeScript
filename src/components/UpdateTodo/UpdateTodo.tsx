import React, {useCallback, useEffect, useState} from "react";
import useMutate from "../../hooks/useMutate";
import {updateTodo} from "../../api/todos";
import CustomButton from "../CustomButton/CustomButton";
import {TextArea} from "./style";
import {Container2, DoneContainer,ButtonContainer,TitleContainer} from "../ReadTodo/style";
import {useDispatch, useSelector} from "react-redux";
import {Todo, changeContent} from "../../redux/reducers/todosSlice";
import { RootState } from './../../type/local';

interface UpdateTodoProps{
  toggleUpdate:()=>void
}

const UpdateTodo = ({toggleUpdate}:UpdateTodoProps) => {
  const mutation_updateTodo= useMutate(updateTodo,'todos')
  const [content,setContent] = useState<string|undefined>('')
  const onChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  }
  const {todo}:{todo:Todo|null} = useSelector((state:RootState)=>state.todos)
  const dispatch =useDispatch()
  const update_Todo=useCallback(()=>{
    const sendData ={id:todo?.id,content}
    mutation_updateTodo.mutate(sendData)
    toggleUpdate()
    const newTodo = {
      title:todo?.title,
      content,
      done:todo?.done,
      id:todo?.id,
    };
    dispatch(changeContent(newTodo))
  },[todo,mutation_updateTodo,content,dispatch,toggleUpdate])

  useEffect(()=>{
    setContent(todo?.content)
  },[setContent,todo?.content])

  return (
    <>
        <TitleContainer>
          <DoneContainer done={todo?.done}>{todo?.done ? "완료" : "미완료"}</DoneContainer>
          <h1>{todo?.title}</h1>
        </TitleContainer>
      <Container2>
        <TextArea name="body" rows={20} maxLength={200} value={content} onChange={onChangeContent}></TextArea>
      </Container2>
      <ButtonContainer>
        <CustomButton theme={'type1'} size={'medium'} onClick={update_Todo}>수정완료</CustomButton>
      </ButtonContainer>
    </>
  )
}

export default UpdateTodo