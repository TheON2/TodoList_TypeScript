import {ListContainer} from "./style";
import React from "react";
import {
  Todo,
} from "../../redux/reducers/todosSlice";
import TodosInfinite from "../TodosInfinite/TodosInfinite";
import TodosPagination from "../TodosPagination/TodosPagination";
import Todos from "../Todos/Todos";

interface TodosListProps{
  todos:Todo[]
}

const TodosList = ({todos}:TodosListProps) => {
  return (
    <ListContainer>
      <Todos todos={todos}/>
      <TodosInfinite/>
      <TodosPagination/>
    </ListContainer>
  )
}

export default TodosList