import { ListContainer } from "./style";
import React from "react";
import { Todo } from "../../redux/reducers/todosSlice";
import TodosInfinite from "../TodosInfinite/TodosInfinite";
import TodosPagination from "../TodosPagination/TodosPagination";
import Todos from "../Todos/Todos";
import { RootState } from "../../type/local";
import { useSelector } from "react-redux";

interface TodosListProps {
  todos: Todo[];
}

const TodosList = ({ todos }: TodosListProps) => {
  const { viewMode, viewMethod } = useSelector(
    (state: RootState) => state.todos
  );
  return (
    <ListContainer>
      <Todos todos={todos} />
      {viewMode !== 1 && <TodosInfinite />}
      <TodosPagination />
    </ListContainer>
  );
};

export default TodosList;
