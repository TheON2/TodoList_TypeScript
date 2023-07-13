import React, { useEffect } from "react";
import { UseQueryResult, useQuery } from "react-query";
import { getTodos } from "../../api/todos";
import Header from "../Header/Header";
import AddForm from "../../components/AddForm/AddForm";
import TodosList from "../../components/TodosList/TodosList";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  GlobalStyle,
  LayOut,
  MainContainer,
  Parent,
  TotalContainer,
} from "./style";
import Profile from "../../components/Profile/Profile";
import { getAuthToken } from "../../api/user";
import { UserResponse, authUser } from "../../redux/reducers/userSlice";
import CustomModal from "../../components/CustomModal/CustomModal";
import Loading from "../../components/Loading/Loading";
import { RootState } from "./../../type/local";
import { UserState } from "./../../redux/reducers/userSlice";

const Main = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user }: { user: UserState["user"] } = useSelector(
    (state: RootState) => state.user
  );
  const {
    data: userData,
    isSuccess: tokenSuccess,
  }: UseQueryResult<UserResponse, unknown> = useQuery("user", getAuthToken, {
    cacheTime: 0,
  });
  const { isLoading, isError, data } = useQuery("todos", getTodos);

  useEffect(() => {
    if (tokenSuccess) {
      dispatch(authUser(userData));
    } else if (user.token === undefined) {
      navigate("/Login");
    }
  }, [user.token, tokenSuccess, dispatch, navigate, userData]);

  if (isLoading) {
    return (
      <Parent>
        <Loading />
      </Parent>
    );
  }

  if (isError) {
    navigate("/Login");
  }

  //유저 토큰이 있을때만 투두스를 가져오게 해야함

  return (
    <div id="root">
      <GlobalStyle />
      <LayOut>
        <CustomModal type={"type1"} />
        <Header title={"The Todo"} stack={"React"} />
        <AddForm />
        <MainContainer>
          <TotalContainer>
            <Profile
              nickName={user.nickName}
              wokringCount={data.doneTodosCount}
              doneCount={data.notDoneTodosCount}
            />
          </TotalContainer>
          <TodosList todos={data.Todos} />
        </MainContainer>
      </LayOut>
    </div>
  );
};

export default Main;
