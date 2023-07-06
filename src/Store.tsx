import { configureStore } from '@reduxjs/toolkit'
import observerReducer from './components/slices/ObserverSlice'
import starDataReducer from './components/slices/StarDataSlice'

export const store = configureStore({
  reducer: {
    observer: observerReducer,
    starData: starDataReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch