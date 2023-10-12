import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export interface Auth {
  secret: string;
}

const auth = createSlice({
  name: 'noteList',
  initialState: {
    auth: {} as Auth,
    loading: false,
    isSuccess: false,
  },
  reducers: {
    setAuth: (state, action: PayloadAction<Auth>) => {
      state.auth = action.payload;
    },
  },
});

export const {setAuth} = auth.actions;
export default auth.reducer;
