import {useCallback} from "react";
import { deleteTodo,updateDoneTodo } from "../../api/todos";
import useMutate from "../../hooks/useMutate";
import CustomButton from "../CustomButton/CustomButton";
import {ButtonSet, ListWrapper, TodoContainer} from "./style";
import {useDispatch, useSelector} from "react-redux";
import { Todo, TodoDelete, trueHaveNew, trueModal} from "../../redux/reducers/todosSlice";
import {StyledH4} from "../CustomModal/style";
import { RootState } from "../../redux/config/configStore";

interface TodoCardProps{
  todo:Todo
}

const TodoCard = ({todo}:TodoCardProps) => {
  const dispatch = useDispatch()
  const { viewMode } = useSelector((state:RootState) => state.todos);
  const onModal=useCallback(()=>{
    dispatch(trueModal(todo))
  },[dispatch,todo])
  const mutation_deleteTodo= useMutate(deleteTodo,'todos')
  const mutation_updateDoneTodo= useMutate(updateDoneTodo,'todos')
  const delete_Todo=useCallback(()=>{
    mutation_deleteTodo.mutate(todo.id)
    dispatch(TodoDelete(todo.id))
    if(viewMode===1){
      dispatch(trueHaveNew())
    }
  },[todo,mutation_deleteTodo,dispatch,viewMode])
  const update_DoneTodo=useCallback(()=>{
    mutation_updateDoneTodo.mutate(todo)
    dispatch(TodoDelete(todo.id))
    if(viewMode===1){
      dispatch(trueHaveNew())
    }
  },[todo,mutation_updateDoneTodo,dispatch,viewMode])

  return (
    <ListWrapper>
      <TodoContainer>
        <StyledH4 href='#' onClick={onModal}>More Detail</StyledH4>
        <div><h2 className="todo-title">{todo.title}</h2>
          <div>{todo.content}</div>
        </div>
        <ButtonSet>
          <CustomButton theme={'type2'} size={'medium'} onClick={delete_Todo}>Delete</CustomButton>
          {todo.done ? <CustomButton theme={'type1'} size={'medium'} onClick={update_DoneTodo}>Cancel</CustomButton>:
            <CustomButton theme={'type1'} size={'medium'} onClick={update_DoneTodo}>Done</CustomButton>}
        </ButtonSet>
      </TodoContainer>
    </ListWrapper>
  )
}

export default TodoCard