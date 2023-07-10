import React, {useCallback, useEffect} from "react";
import useMutate from "../../hooks/useMutate";
import {updateTodo} from "../../api/todos";
import CustomButton from "../CustomButton/CustomButton";
import useInput from "../../hooks/useInput";
import {TextArea} from "./style";
import {Container2, DoneContainer,ButtonContainer,TitleContainer} from "../ReadTodo/style";
import {useDispatch, useSelector} from "react-redux";
import {changeContent} from "../../redux/reducers/todosSlice";
import {v4 as uuidv4} from "uuid";

const UpdateTodo = ({toggleUpdate}) => {
  const mutation_updateTodo= useMutate(updateTodo,'todos')
  const [content,onChangeContent,setContent] = useInput('')
  const {todo} = useSelector(state=>state.todos)
  const dispatch =useDispatch()
  const update_Todo=useCallback(()=>{
    const sendData ={id:todo.id,content}
    mutation_updateTodo.mutate(sendData)
    toggleUpdate()
    const newTodo = {
      title:todo.title,
      content,
      done:todo.done,
      id:todo.id,
    };
    dispatch(changeContent(newTodo))
  },[todo,mutation_updateTodo,content,setContent])

  useEffect(()=>{
    setContent(todo.content)
  },[])

  return (
    <>
        <TitleContainer>
          <DoneContainer done={todo?.done}>{todo?.done ? "완료" : "미완료"}</DoneContainer>
          <h1>{todo?.title}</h1>
        </TitleContainer>
      <Container2>
        <TextArea name="body" rows="20" maxLength="200" value={content} onChange={onChangeContent}></TextArea>
      </Container2>
      <ButtonContainer>
        <CustomButton theme={'type1'} size={'medium'} onClick={update_Todo}>수정완료</CustomButton>
      </ButtonContainer>
    </>
  )
}

export default UpdateTodo