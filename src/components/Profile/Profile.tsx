import {ProfileContainer, ProfilePicture, UserName} from "./style";
import {useNavigate} from "react-router-dom";
import {userLogOut} from "../../api/user";
import { logOutUser} from "../../redux/reducers/userSlice";
import {useCallback} from "react";
import CustomButton from "../CustomButton/CustomButton";
import { useDispatch, useSelector} from "react-redux";
import { RootState } from './../../type/local';
import { useMutation, useQueryClient } from "react-query";

interface ProfileProps{
  nickName:string|null,
  wokringCount:number,
  doneCount:number
}

const Profile =({nickName,wokringCount,doneCount}:ProfileProps)=>{
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const {mutate:logOut_mutate} = useMutation(userLogOut, {
    onSuccess: () => {
      queryClient.invalidateQueries('user');
      dispatch(logOutUser())
      navigate("/Login");
    },
  });
  const navigate = useNavigate();
  const { imageUrl,profileContent } = useSelector((state:RootState)=>state.user.user)
  const onLogOut = useCallback(()=>{
    logOut_mutate()
  },[logOut_mutate])

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