import { configureStore } from '@reduxjs/toolkit'
import todos from '../reducers/Todos'
import users from '../reducers/Users'
import albums from '../reducers/Albums'
export const store = configureStore({
  reducer: {
    todos,
    users,
    albums,
  },
})