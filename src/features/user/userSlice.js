import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLogin: false,
  info: {},
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.isLogin = action.payload;
    },
    setUserInfo: (state, action) => {
      state.info = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setLogin, setUserInfo } = userSlice.actions

export default userSlice.reducer
