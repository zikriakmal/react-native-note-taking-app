import {configureStore} from '@reduxjs/toolkit';
import notesReducer from './reducers/notesReducer';
import authReducer from './reducers/authReducer';

export const store = configureStore({
  reducer: {notes: notesReducer, auth: authReducer},
});

export type RootState = ReturnType<typeof store.getState>;
