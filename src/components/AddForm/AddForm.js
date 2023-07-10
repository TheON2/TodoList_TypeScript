import {useCallback} from "react";
import useInput from "../../hooks/useInput";
import {v4 as uuidv4} from 'uuid'
import {addTodo} from "../../api/todos";
import useMutate from "../../hooks/useMutate";
import CustomButton from "../CustomButton/CustomButton";
import {Form, Input, InputContent, InputGroup, Label} from "./style";
import {resetTodos, trueHaveNew} from "../../redux/reducers/todosSlice";
import {useSelector} from "react-redux";

const AddForm = () => {
  const [title,onChangeTitle,setTitle] = useInput('')
  const [content,onChangeContent,setContent] = useInput('')
  const mutation = useMutate(addTodo,'todos',trueHaveNew)
  const {email} = useSelector(state=>state.user.user)

  const add_Todo=useCallback((e)=>{
    if(title===''){
      alert('제목을 입력하세용')
      return
    }
    if(content===''){
      alert('내용을 입력하세용')
      return
    }
    e.preventDefault()
    console.log(email)

    const newTodo = {
      title,
      content,
      done: false,
      id: uuidv4(),
      writerEmail:email,
    };

    mutation.mutate(newTodo)

    setTitle('')
    setContent('')
  },[email,title,content,mutation,setTitle,setContent])

  return (
    <Form>
      <InputGroup>
        <Label>Title</Label>
        <Input value={title} onChange={onChangeTitle} />
        <Label>Content</Label>
        <InputContent value={content} onChange={onChangeContent} />
      </InputGroup>
      <CustomButton theme={'type1'} size={'medium'} onClick={add_Todo}>Todo!</CustomButton>
    </Form>
  );
};

export default AddForm;