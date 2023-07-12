import TodoCard from "../TodoCard/TodoCard";
import {ListContainer, TodoContainer} from "./style";
import React, {useCallback, useEffect, useState} from "react";
import useMutate from "../../hooks/useMutate";
import { getTodosDonePaging, getTodosWorkingPaging} from "../../api/todos";
import {
  changeViewMethod,
   falseHaveNew,
  loadTodosPaging,
  resetTodos, trueHaveNew,
} from "../../redux/reducers/todosSlice";
import {useDispatch, useSelector} from "react-redux";
import Pagination from "../Pagination/Pagination";
import {IoInfinite} from "react-icons/io5";
import {FaPager} from "react-icons/fa";
import { RootState } from "../../redux/config/configStore";

const TodosPagination = () => {
  const dispatch = useDispatch()
  const { hasMoreTodos, todos: todolist, page: pageNum,viewMode,viewMethod,haveNew } = 
  useSelector((state:RootState) => state.todos);
  const [page,setPage] = useState(0)
  const workingTodosPage_Mutate = useMutate(getTodosWorkingPaging,'todos',loadTodosPaging)
  const doneTodosPage_Mutate = useMutate(getTodosDonePaging,'todos',loadTodosPaging)

  const onChangeAll = useCallback(()=>{
    setPage(0)
    dispatch(resetTodos())
    dispatch(trueHaveNew())
  },[dispatch])
  const onChangeViewMethod = useCallback((num:number)=>{
    console.log(viewMethod,num)
    if(viewMethod!==num) {
      dispatch(changeViewMethod(num))
      setPage(0)
    }
  },[viewMethod,dispatch])

  useEffect(()=>{
    if(haveNew){
      dispatch(falseHaveNew())
    }
    if(hasMoreTodos){
      if(viewMode===2){
        console.log(page)
        workingTodosPage_Mutate.mutate(0)
      }else if(viewMode===3){
        doneTodosPage_Mutate.mutate(0)
      } 
    }
  },[viewMode,viewMethod,haveNew])

  return (
    <>

      { viewMode === 2 && viewMethod === 2 &&
      <>
        <h2 className="list-title" style={{display: 'flex'}} onClick={onChangeAll}>Working.. 🔥
          <span style={{marginRight: 'auto'}}>
            <button onClick={(e)=>{e.stopPropagation();onChangeViewMethod(1)}}><IoInfinite size={'2em'} /></button>
            <button onClick={(e)=>{e.stopPropagation();onChangeViewMethod(2)}}><FaPager size={'2em'} /></button>
          </span>
        </h2>
        <Pagination page={pageNum}/>
        <TodoContainer>
          {todolist?.map((todo) =>
            <TodoCard key={todo.id} todo={todo}/>
          )}
        </TodoContainer>
      </>}
      { viewMode === 3 && viewMethod === 2 &&
      <>
        <h2 className="list-title" style={{display: 'flex'}} onClick={onChangeAll}>Done..! 🎉
          <span style={{marginRight: 'auto'}}>
            <button onClick={(e)=>{e.stopPropagation();onChangeViewMethod(1)}}><IoInfinite size={'2em'} /></button>
            <button onClick={(e)=>{e.stopPropagation();onChangeViewMethod(2)}}><FaPager size={'2em'} /></button>
          </span>
        </h2>
        <Pagination page={pageNum}/>
        <TodoContainer>
          {todolist?.map((todo) =>
            <TodoCard key={todo.id} todo={todo}/>
          )}
        </TodoContainer></>}
    </>
  )
}

export default TodosPagination