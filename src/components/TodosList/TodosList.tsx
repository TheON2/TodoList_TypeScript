import TodoCard from "../TodoCard/TodoCard";
import {ListContainer, TodoContainer} from "./style";
import React, {useCallback, useEffect, useState} from "react";
import useMutate from "../../hooks/useMutate";
import { getTodosDone, getTodosDonePaging, getTodosWorking, getTodosWorkingPaging} from "../../api/todos";
import {
  Todo,
  changeViewMode, falseHaveNew,
   loadTodosDone,
  loadTodosPaging, loadTodosWorking,
} from "../../redux/reducers/todosSlice";
import {useDispatch, useSelector} from "react-redux";
import {useMutation, useQueryClient} from "react-query";
import {useInView} from "react-intersection-observer";
 
import { RootState } from "../../redux/config/configStore";
import TodosInfinite from "../TodosInfinite/TodosInfinite";
import TodosPagination from "../TodosPagination/TodosPagination";

interface TodosListProps{
  todos:Todo[]
}

const TodosList = ({todos}:TodosListProps) => {
  const dispatch = useDispatch()
  const { hasMoreTodos, page: viewMode,viewMethod,haveNew } = 
  useSelector((state:RootState) => state.todos);
  const [page,setPage] = useState(0)
  const [ref, inView] = useInView();

  const queryClient = useQueryClient();
  const workingTodosPage_Mutate = useMutate(getTodosWorkingPaging,'todos',loadTodosPaging)
  const doneTodosPage_Mutate = useMutate(getTodosDonePaging,'todos',loadTodosPaging)
  const {mutate:workingTodos_Mutate, isLoading:workingLoading} = useMutation(getTodosWorking, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('todos');
      dispatch(loadTodosWorking(data))
    },
  });
  const {mutate:doneTodos_Mutate, isLoading:doneLoading} = useMutation(getTodosDone, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('todos');
      dispatch(loadTodosDone(data))
    },
  });

  const onChangeViewMode = useCallback((num:number)=>{
    console.log(viewMode,num)
    if(viewMode!==num) {
      dispatch(changeViewMode(num))
      setPage(0)
    }
  },[viewMode,dispatch])

  useEffect(()=>{
    if(haveNew){
      dispatch(falseHaveNew())
    }
    if(hasMoreTodos){
      if(viewMethod===1){
        if(viewMode===2){
          console.log(page)
          workingTodos_Mutate(page)
          setPage(page+1)
        }else if(viewMode===3){
          doneTodos_Mutate(page)
          setPage(page+1)
        }
      }else{
        if(viewMode===2){
          console.log(page)
          workingTodosPage_Mutate.mutate(0)
        }else if(viewMode===3){
          doneTodosPage_Mutate.mutate(0)
        }
      }
    }
  },[viewMode,viewMethod,haveNew])

  useEffect(
    () => {
      if (inView && hasMoreTodos) {
        if(viewMethod===1){
          if(viewMode===2 && !workingLoading){
            workingTodos_Mutate(page)
            setPage(page+1)
          }else if(viewMode===3 && !doneLoading){
            doneTodos_Mutate(page)
            setPage(page+1)
          }
        }
      }
    },[inView, hasMoreTodos, workingLoading, page]);

  return (
    <ListContainer>
      { viewMode === 1 &&
        <>
      <h2 className="list-title" onClick={()=>{onChangeViewMode(2)}}>Working.. 🔥</h2>
      <TodoContainer>
        {todos.filter((a) => a.done === false).map((todo) =>
          <TodoCard key={todo.id} todo={todo}/>
        )}
      </TodoContainer>
      <h2 className="list-title" onClick={()=>{onChangeViewMode(3)}}>Done..! 🎉</h2>
      <TodoContainer>
        {todos.filter((a) => a.done === true).map((todo) =>
          <TodoCard key={todo.id} todo={todo}/>
        )}
      </TodoContainer></>}
      <TodosInfinite/>
      <TodosPagination/>
    </ListContainer>
  )
}

export default TodosList