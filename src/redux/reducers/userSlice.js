import { createSlice } from '@reduxjs/toolkit'

const initialState = {
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
    loginUser: (state, action) => {
      state.user.email=action.payload.userResponse.email
      state.user.nickName=action.payload.userResponse.nickName
      state.user.profileContent=action.payload.userResponse.profileContent
      state.user.imageUrl=action.payload.userResponse.profileUrl
      state.user.token=action.payload.token
      localStorage.setItem('token', action.payload.token);
      state.user.isLogged=true
    },
    authUser: (state, action) => {
      state.user.email=action.payload.userResponse.email
      state.user.nickName=action.payload.userResponse.nickName
      state.user.profileContent=action.payload.userResponse.profileContent
      state.user.imageUrl=action.payload.userResponse.profileUrl
      state.user.isLogged=true
    },
    getProfileImage: (state, action) => {
      state.user.imageUrl=action.payload
    },
    unauthUser: (state, action) => {
      state.user.email=null
      state.user.name=null
      state.user.isLogged=false
      state.user.profileContent=null
      state.user.imageUrl=null
      state.user.nickName=null
      state.user.token=undefined
      localStorage.removeItem('token');
    },
    logOutUser: (state, action) => {
      state.user.email=null
      state.user.name=null
      state.user.token=null
      state.user.isLogged=false
      state.user.profileContent=null
      state.user.imageUrl=null
      state.user.nickName=null
      localStorage.removeItem('token');
    },
  },
})

export const { loginUser, logOutUser,authUser,unauthUser,getProfileImage} = userSlice.actions

export default userSlice.reducer