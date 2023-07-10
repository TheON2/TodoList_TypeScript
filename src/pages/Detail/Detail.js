import React, {useCallback, useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {useQuery} from "react-query";
import {deleteTodo, getTodo, getTodos} from "../../api/todos";
import CustomButton from "../../components/CustomButton/CustomButton";
import ReadTodo from "../../components/ReadTodo/ReadTodo";
import UpdateTodo from "../../components/UpdateTodo/UpdateTodo";
import {Container, GlobalStyle, Linker} from "./style";
import useMutate from "../../hooks/useMutate";
import {changeViewMode, loadTodo, loadTodos, trueHaveNew} from "../../redux/reducers/todosSlice";
import {useDispatch, useSelector} from "react-redux";

const Detail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [onUpdate,setOnUpdate]=useState(false)
  const { data, error, isLoading, isError } = useQuery(['todos'], () => getTodo(params.id));
  const dispatch = useDispatch()

  useEffect(() => {
    if (!data) {
      alert("Invalid access. Redirecting to main page.");
      navigate("/");
    }
  }, [data, navigate]);

  const handleButtonClick = () => {
    // dispatch(changeViewMode(1))
    dispatch(trueHaveNew())
    navigate("/");
  };

  const toggleUpdate = useCallback(()=>{
    setOnUpdate(prev => !prev)
  },[])

  if (isLoading) {
    return <p>로딩중입니다....!</p>;
  }

  if (isError) {
    return <p>오류가 발생하였습니다...!</p>;
  }

  return (
    <>
    <GlobalStyle/>
    <Container>
      <div>
        <Linker href='/'>
        <CustomButton theme={'type1'} size={'medium'}>이전으로</CustomButton>
        </Linker>
          { !onUpdate ?
          <ReadTodo todo={data} toggleUpdate={toggleUpdate}/>:
          <UpdateTodo todo={data} toggleUpdate={toggleUpdate}/>}
      </div>
    </Container>
    </>
  )
}

export default Detail
