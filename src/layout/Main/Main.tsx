import React, {useEffect, useState} from 'react';
import {useQuery} from "react-query";
import {getTodos} from "../../api/todos";
import Header from "../Header/Header";
import AddForm from "../../components/AddForm/AddForm";
import TodosList from "../../components/TodosList/TodosList";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {GlobalStyle, LayOut, MainContainer, Parent, TotalContainer} from "./style";
import Profile from "../../components/Profile/Profile";
import {getAuthToken} from "../../api/user";
import {authUser} from "../../redux/reducers/userSlice";
import CustomModal from "../../components/CustomModal/CustomModal";
import Loading from "../../components/Loading/Loading";

const Main = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.user)
  const { isError:tokenError, data:userData ,isSuccess:tokenSuccess} = useQuery('user',getAuthToken, { cacheTime: 0 })
  const {isLoading, isError, data} = useQuery("todos", getTodos);

  useEffect(() => {
    if(tokenSuccess) {
      dispatch(authUser(userData));
    }else if(user.token===undefined){
      navigate("/Login");
    }
  }, [user.token,tokenSuccess]);

  if (isLoading) {
    return <Parent><Loading /></Parent>
  }

  if (isError) {
    return <p>오류가 발생하였습니다...!</p>;
  }

  return (
    <div id='root'>
      <GlobalStyle/>
      <LayOut>
        <CustomModal type={'type1'}/>
        <Header title={'The Todo'} stack={'React'} user={user}/>
        <AddForm/>
        <MainContainer>
          <TotalContainer>
            <Profile nickName={user.nickName} wokringCount={data.doneTodosCount} doneCount={data.notDoneTodosCount}/>
          </TotalContainer>
          <TodosList todos={data.Todos}/>
        </MainContainer>
      </LayOut>
    </div>
  );
};

export default Main;