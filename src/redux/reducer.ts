import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Movie} from '../types';

const initialState: Array<Movie> = [];

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    addMovie: (state, action: PayloadAction<Movie, string>) => {
      state.push(action.payload);
      return state;
    },
    removeMovie: (state, action: PayloadAction<string, string>) => {
      const indexOfMovie = state.findIndex(
        movie => movie.imdbID === action.payload,
      );
      state.splice(indexOfMovie, 1);

      return state;
    },
  },
});

export const {addMovie, removeMovie} = moviesSlice.actions;
export default moviesSlice.reducer;
