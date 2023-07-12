import TodoCard from "../TodoCard/TodoCard";
import { TodoContainer } from "./style";
import React, {useCallback, useEffect, useState} from "react";
import { getTodosDone, getTodosWorking} from "../../api/todos";
import {
  changeViewMethod,
  falseHaveNew,
   loadTodosDone,
 loadTodosWorking,
  resetTodos, trueHaveNew,
} from "../../redux/reducers/todosSlice";
import {useDispatch, useSelector} from "react-redux";
import {useMutation, useQueryClient} from "react-query";
import {useInView} from "react-intersection-observer";
import {IoInfinite} from "react-icons/io5";
import {FaPager} from "react-icons/fa";
import { RootState } from "../../redux/config/configStore";

const TodosInfinite = () => {
  const dispatch = useDispatch()
  const { hasMoreTodos, todos: todolist,viewMode,viewMethod,haveNew } = 
  useSelector((state:RootState) => state.todos);
  const [page,setPage] = useState(0)
  const [ref, inView] = useInView();

  const queryClient = useQueryClient();
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
      if(viewMethod===1){
        if(viewMode===2){
          console.log(page)
          workingTodos_Mutate(page)
          setPage(page+1)
        }else if(viewMode===3){
          doneTodos_Mutate(page)
          setPage(page+1)
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
    },[inView]);

  return (<>
      { viewMode === 2 && viewMethod === 1 &&
      <>
        <h2 className="list-title" style={{display: 'flex'}} onClick={onChangeAll}>Working.. 🔥
          <span style={{marginRight: 'auto'}}>
            <button onClick={(e)=>{e.stopPropagation();onChangeViewMethod(1)}}><IoInfinite size={'2em'} /></button>
            <button onClick={(e)=>{e.stopPropagation();onChangeViewMethod(2)}}><FaPager size={'2em'} /></button>
          </span>
        </h2>
        <TodoContainer>
          {todolist?.map((todo) =>
            <TodoCard key={todo.id} todo={todo}/>
          )}
        </TodoContainer>
        <div id='bottom' style={{height:'200px'}} ref={hasMoreTodos && !workingLoading ? ref : undefined} />
       </>}
      { viewMode === 3 && viewMethod === 1 &&
      <>
        <h2 className="list-title" style={{display: 'flex'}} onClick={onChangeAll}>Done..! 🎉
          <span style={{marginRight: 'auto'}}>
            <button onClick={(e)=>{e.stopPropagation();onChangeViewMethod(1)}}><IoInfinite size={'2em'} /></button>
            <button onClick={(e)=>{e.stopPropagation();onChangeViewMethod(2)}}><FaPager size={'2em'} /></button>
          </span>
        </h2>
        <TodoContainer>
          {todolist?.map((todo) =>
            <TodoCard key={todo.id} todo={todo}/>
          )}
        </TodoContainer>
        <div id='bottom' style={{height:'200px'}} ref={hasMoreTodos && !doneLoading ? ref : undefined} />
      </>}
      </>
  )
}

export default TodosInfinite