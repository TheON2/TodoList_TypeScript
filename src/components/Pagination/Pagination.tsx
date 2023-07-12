import {Container, PaginationItem, PaginationLink, PaginationUl} from "./style";
import useMutate from "../../hooks/useMutate";
import {getTodosDonePaging, getTodosWorkingPaging} from "../../api/todos";
import {loadTodosPaging} from "../../redux/reducers/todosSlice";
import {useSelector} from "react-redux";
import {useCallback, useEffect, useState} from "react";
import { RootState } from "../../redux/config/configStore";

interface PaginationProps{
  page:number,
}

const Pagination =({page}:PaginationProps)=>{
  const workingTodosPage_Mutate = useMutate(getTodosWorkingPaging,'todos',loadTodosPaging)
  const doneTodosPage_Mutate = useMutate(getTodosDonePaging,'todos',loadTodosPaging)
  const {viewMode} = useSelector((state:RootState) => state.todos);
  const [activePage, setActivePage] = useState(0);

  const handlePageChange = useCallback((pageNumber:number) => {
    setActivePage(pageNumber);
  },[]);

  useEffect(()=>{
    if(viewMode===2){
      workingTodosPage_Mutate.mutate(activePage)
    }else if(viewMode===3){
      doneTodosPage_Mutate.mutate(activePage)
    }
  },[activePage])

  return(
    <><Container>
      <PaginationUl>
        {[...Array(page)].map((_, i) => (
          <PaginationItem className={i === activePage ? 'active' : ''}>
            <PaginationLink href="#" onClick={()=>handlePageChange(i)}>{i+1}</PaginationLink>
          </PaginationItem>
        ))}
      </PaginationUl>
    </Container></>
  )
}

export default Pagination