import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export interface Notes {
  id: number;
  note: string;
  subnote: string;
  datetime: string;
}

const noteList = createSlice({
  name: 'noteList',
  initialState: {
    notes: [] as Notes[],
    loading: false,
    isSuccess: false,
  },
  reducers: {
    setNotes: (state, action: PayloadAction<Notes[]>) => {
      state.notes = action.payload;
    },
  },
});

export const {setNotes} = noteList.actions;
export default noteList.reducer;
