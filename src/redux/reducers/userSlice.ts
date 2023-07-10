import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  email: string | null;
  nickName: string | null;
  isLogged: boolean;
  token: string | null;
  logInLoading: boolean;
  logInDone: boolean;
  logInError: boolean;
  imageUrl: string | null;
  profileContent: string | null;
};

interface UserResponse {
  email: string | null;
  nickName: string | null;
  isLogged: boolean;
  token: string | null;
  logInLoading: boolean;
  logInDone: boolean;
  logInError: boolean;
  imageUrl: string | null;
  profileContent: string | null;
  profileUrl:string | null;
};

interface RootState {
  user: UserState;
};

const initialState: RootState = {
  user: {
    email: null,
    nickName: null,
    isLogged: false,
    token: null,
    logInLoading: false,
    logInDone: false,
    logInError: false,
    imageUrl: null,
    profileContent: null,
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state: RootState, action: PayloadAction<{ userResponse: UserResponse; token: string }>) => {
      state.user.email = action.payload.userResponse.email;
      state.user.nickName = action.payload.userResponse.nickName;
      state.user.profileContent = action.payload.userResponse.profileContent;
      state.user.imageUrl = action.payload.userResponse.profileUrl;
      state.user.token = action.payload.token;
      localStorage.setItem('token', action.payload.token);
      state.user.isLogged = true;
    },
    authUser: (state: RootState, action: PayloadAction<{ userResponse: UserResponse }>) => {
      state.user.email = action.payload.userResponse.email;
      state.user.nickName = action.payload.userResponse.nickName;
      state.user.profileContent = action.payload.userResponse.profileContent;
      state.user.imageUrl = action.payload.userResponse.profileUrl;
      state.user.isLogged = true;
    },
    getProfileImage: (state: RootState, action: PayloadAction<string>) => {
      state.user.imageUrl = action.payload;
    },
    unauthUser: (state: RootState) => {
      state.user.email = null;
      state.user.isLogged = false;
      state.user.profileContent = null;
      state.user.imageUrl = null;
      state.user.nickName = null;
      state.user.token = null;
      localStorage.removeItem('token');
    },
    logOutUser: (state: RootState) => {
      state.user.email = null;
      state.user.token = null;
      state.user.isLogged = false;
      state.user.profileContent = null;
      state.user.imageUrl = null;
      state.user.nickName = null;
      localStorage.removeItem('token');
    },
  },
});

export const { loginUser, logOutUser, authUser, unauthUser, getProfileImage } = userSlice.actions;

export default userSlice.reducer;
