import TodoCard from "../TodoCard/TodoCard";
import {TodoContainer} from "./style";
import React, {useCallback, useEffect, useState} from "react";
import {
  Todo,
  changeViewMode, falseHaveNew,
} from "../../redux/reducers/todosSlice";
import {useDispatch, useSelector} from "react-redux";
 
import { RootState } from "../../redux/config/configStore";

interface TodosProps{
  todos:Todo[]
}

const Todos = ({todos}:TodosProps) => {
  const dispatch = useDispatch()
  const { viewMode,haveNew } = useSelector((state:RootState) => state.todos);
  const [,setPage] = useState(0)
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
  },[haveNew,dispatch])
  return (
    <>
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
    </>
  )
}

export default Todos