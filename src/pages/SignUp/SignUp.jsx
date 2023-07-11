import useInput from "../../hooks/useInput";
import useMutate from "../../hooks/useMutate";
import {addUser} from "../../api/user";
import {
  Button,
  Container,
  Form,
  GlobalStyle,
  Input, SignUpButton, SignUpContainer,
  SocialContainer
} from "../SignUp/style";
import React, {useCallback, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {FaFacebookF, FaGoogle} from "react-icons/fa6";
import {RiKakaoTalkFill} from "react-icons/ri";
import {SiNaver} from "react-icons/si";

function SignUp() {
  const [email, onChangeEmail] = useInput('');
  const [nickName, onChangeNickname] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [confirmPassword, onChangeConfirmPassword] = useInput('');
  const [confirMessage, onChangeConfirmMessage, setComfirmMessage] = useInput('');
  const [signUp, onSignUp,setSignUp] = useInput(false);
  const addUser_mutate = useMutate(addUser,'user');
  const navigate = useNavigate();

  const checkLogin =useCallback(()=>{
    const pattern = /^[^@]+@[^@]+$/;
    if(pattern.test(email)&&password.length>=1&&confirmPassword.length>=1&&nickName.length>=1) setSignUp(true)
    else setSignUp(false)
  },[email,password,confirmPassword,nickName,signUp]);

  const goLogin = () =>{
    navigate("/Login");
  }

  useEffect(() => {
    if (addUser_mutate.isSuccess) {
      navigate("/");
    }
  }, [addUser_mutate.isSuccess, navigate]);

  useEffect(() => {
    setComfirmMessage('')
    checkLogin()
  }, [email,nickName,password,confirmPassword]);

  useEffect(() => {
    if (addUser_mutate.isError) {
      setComfirmMessage(addUser_mutate.error.response.data);
    }
  }, [addUser_mutate.isError, addUser_mutate.error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!signUp) return
    if(password !== confirmPassword) {
      setComfirmMessage('비밀번호와 확인비밀번호가 일치하지 않습니다.')
      return;
    }
    const newUser = {
      email,
      password,
      nickName,
    };
    addUser_mutate.mutate(newUser)
    console.log(`Email: ${email}, Password: ${password}`);
  };

  return (
    <div>
      <GlobalStyle/>
      <Container>
            <SignUpContainer>
              <SignUpButton onClick={goLogin}>Login</SignUpButton>
            </SignUpContainer>
        <Form onSubmit={handleSubmit}>
          <h1>Create Account</h1>
          <div>
            <SocialContainer>
              <a href={`${import.meta.env.VITE_APP_LOCAL_SERVER}/user/naver`} className="social"><SiNaver size={'2em'} /></a>
              <a href={`${import.meta.env.VITE_APP_LOCAL_SERVER}/user/google`} className="social"><FaGoogle size={'2em'} /></a>
              <a href={`${import.meta.env.VITE_APP_LOCAL_SERVER}/user/kakao`} className="social"><RiKakaoTalkFill size={'2em'} color={'black'}/></a>
            </SocialContainer>
          </div>
          <span>or use your email for registration</span>
          <Input type="email" placeholder="Email" value={email} onChange={onChangeEmail}/>
          <Input type="nickName" placeholder="NickName" value={nickName} onChange={onChangeNickname}/>
          <Input type="password" placeholder="Password" value={password} onChange={onChangePassword}/>
          <Input type="confirmpassword" placeholder="ConfirmPassword" value={confirmPassword} onChange={onChangeConfirmPassword}/>
          <h3>{confirMessage}</h3>
          <Button signup={signUp}>Sign Up</Button>
        </Form>
      </Container>
    </div>
  );
}

export default SignUp;
