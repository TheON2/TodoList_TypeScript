import {ProfileContainer, ProfileOptions, ProfilePicture, UserName} from "./style";
import {useNavigate} from "react-router-dom";
import useMutate from "../../hooks/useMutate";
import {profileChange, userLogOut} from "../../api/user";
import {getProfileImage, logOutUser} from "../../redux/reducers/userSlice";
import {useCallback, useEffect, useRef, useState} from "react";
import {Button} from "../../layout/Header/style";
import CustomButton from "../CustomButton/CustomButton";
import {useDispatch, useSelector} from "react-redux";
import {useMutation, useQueryClient} from "react-query";
import {getTodosDone} from "../../api/todos";
import {loadTodosDone} from "../../redux/reducers/todosSlice";

const Profile =({nickName,wokringCount,doneCount})=>{
  const navigate = useNavigate();
  const { imageUrl,profileContent } = useSelector(state=>state.user.user)
  const logOut_mutate= useMutate(userLogOut,'user',logOutUser)
  const onLogOut = useCallback(()=>{
    logOut_mutate.mutate()
  },[])
  useEffect(() => {
    if (logOut_mutate.isSuccess) {
      navigate("/Login");
    }
  }, [logOut_mutate.isSuccess, navigate]);
  return(<div>
    <ProfileContainer className="profile block">
      <ProfilePicture >
        {imageUrl!==null ?
            <img src={`${imageUrl}`} style={{ width: '200px' }} alt={imageUrl} />
         : <img width="150px" alt="Anne Hathaway picture" src="https://avatars.githubusercontent.com/u/32028454?s=400&u=7993b49546f6ebb45968dbafa6c97c5789ec2254&v=4" />
        }
      </ProfilePicture>
      <UserName >{nickName}</UserName>
      <div className="profile-description">
        <p className="scnd-font-color">{profileContent}</p>
      </div>
      <div>
        <h1 className="list-title">Working.. 🔥</h1>
        <h1 style={{color:'blue'}}>{wokringCount}</h1>
        <h1 className="list-title">Done..! 🎉</h1>
        <h1 style={{color:'red'}}>{doneCount}</h1>
      </div>
      <CustomButton theme={'type2'} size={'small'} onClick={onLogOut}>LogOut</CustomButton>
    </ProfileContainer>
  </div>)
}

export default Profile