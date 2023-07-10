import useInput from "../../hooks/useInput";
import {useNavigate} from "react-router-dom";
import React, {useCallback, useEffect} from "react";
import {authUser, loginUser} from "../../redux/reducers/userSlice";
import useMutate from "../../hooks/useMutate";
import {getAuthToken, userLogin} from "../../api/user";
import { FaFacebookF,FaGoogle } from "react-icons/fa6";
import { RiKakaoTalkFill } from "react-icons/ri";
import { SiNaver } from "react-icons/si";
import {
  Button,
  Container,
  Form,
  GlobalStyle,
  Input, LoginButton,
  LoginContainer,
  SocialContainer
} from "./style";
import {useQuery} from "react-query";
import {useDispatch, useSelector} from "react-redux";

const Login=()=>{
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const login_Mutate = useMutate(userLogin,'user',loginUser);
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [confirMessage, onChangeConfirmMessage, setComfirmMessage] = useInput('');
  const [login, onLogin,setLogin] = useInput(false);
  const {user} = useSelector(state => state.user)
  const { isError:tokenError, data:userData ,isSuccess:tokenSuccess} = useQuery('user',getAuthToken)

  const checkLogin =useCallback(()=>{
    const pattern = /^[^@]+@[^@]+$/;
    if(pattern.test(email)&&password.length>=1) setLogin(true)
    else setLogin(false)
  },[email,password,login]);

  useEffect(() => {
    if(tokenSuccess) {
      dispatch(authUser(userData));
    }else if(tokenError||user.token===undefined){
      navigate("/Login");
    }
  }, [user,tokenSuccess,tokenError, navigate]);

  useEffect(() => {
    if (login_Mutate.isSuccess) {
      navigate("/");
    }
  }, [login_Mutate.isSuccess, navigate]);

  useEffect(() => {
    setComfirmMessage('')
    checkLogin()
  }, [email,password]);

  useEffect(() => {
    if (login_Mutate.isError) {
      setComfirmMessage(login_Mutate.error.response.data);
    }
  }, [login_Mutate.isError, login_Mutate.error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!login) return
    const user = {email,password}
    login_Mutate.mutate(user)
  };

  const goSignUp = () =>{
    navigate("/SignUp");
  }

  const forgotPassword = useCallback(()=>{
    alert('잘 떠올려보셈 ㅡㅡ')
  },[]);
  return(
    <div>
      <GlobalStyle/>
      <Container>
        <div>
          <LoginContainer>
            <LoginButton onClick={goSignUp}>Sign Up</LoginButton>
          </LoginContainer>
          <Form onSubmit={handleSubmit}>
            <h1>The TodoList</h1>
            <div>
              <SocialContainer>
                <a href={`${process.env.REACT_APP_LOCAL_SERVER}/user/naver`} className="social"><SiNaver size={'2em'} /></a>
                <a href={`${process.env.REACT_APP_LOCAL_SERVER}/user/google`} className="social"><FaGoogle size={'2em'} /></a>
                <a href={`${process.env.REACT_APP_LOCAL_SERVER}/user/kakao`} className="social"><RiKakaoTalkFill size={'2em'} color={'black'}/></a>
              </SocialContainer>
            </div>
            <span>or use your account</span>
            <Input type="email" placeholder="Email" value={email} onChange={onChangeEmail}/>
            <Input type="password" placeholder="Password" value={password} onChange={onChangePassword}/>
            <a href='#' onClick={forgotPassword}>Forgot your password?</a>
            <h4>{confirMessage}</h4>
            <Button signup={login}>Sign In</Button>
          </Form>
        </div>
      </Container>
    </div>
  )
}

export default Login