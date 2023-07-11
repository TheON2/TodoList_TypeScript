import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export interface UserState {
  user:{
    email: string | null;
    nickName:string|null,
    isLogged:boolean,
    token:string|null|undefined,
    logInLoading:boolean,
    logInDone:boolean,
    logInError:boolean,
    imageUrl:string|null,
    profileContent:string|null,
  }
}

export interface UserResponse {
  userResponse: Omit<UserState['user'], 'isLogged'|'token'> & {profileUrl : string },
  token:string,
}

const initialState:UserState = {
  user:{
    email:null,
    nickName:null,
    isLogged:false,
    token:null,
    logInLoading:false,
    logInDone:false,
    logInError:false,
    imageUrl:null,
    profileContent:null,
  }
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state:UserState, action:PayloadAction<UserResponse>) => {
      state.user.email=action.payload.userResponse.email
      state.user.nickName=action.payload.userResponse.nickName
      state.user.profileContent=action.payload.userResponse.profileContent
      state.user.imageUrl=action.payload.userResponse.profileUrl
      state.user.token=action.payload.token
      localStorage.setItem('token', action.payload.token);
      state.user.isLogged=true
    },
    authUser: (state:UserState, action:PayloadAction<UserResponse>) => {
      state.user.email=action.payload.userResponse.email
      state.user.nickName=action.payload.userResponse.nickName
      state.user.profileContent=action.payload.userResponse.profileContent
      state.user.imageUrl=action.payload.userResponse.profileUrl
      state.user.isLogged=true
    },
    getProfileImage: (state:UserState, action:PayloadAction<string>) => {
      state.user.imageUrl=action.payload
    },
    unauthUser: (state:UserState) => {
      state.user.email=null
      state.user.isLogged=false
      state.user.profileContent=null
      state.user.imageUrl=null
      state.user.nickName=null
      state.user.token=undefined
      localStorage.removeItem("token");
    },
    logOutUser: (state:UserState) => {
      state.user.email=null
      state.user.token=null
      state.user.isLogged=false
      state.user.profileContent=null
      state.user.imageUrl=null
      state.user.nickName=null
      localStorage.removeItem("token");
    },
  },
})

export const { loginUser, logOutUser,authUser,unauthUser,getProfileImage} = userSlice.actions

export default userSlice.reducer