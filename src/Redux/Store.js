import { configureStore } from '@reduxjs/toolkit'

import userNameReducer from './userNameReducer'
import userImageReducer from './userImageReducer'
import userCoverReducer from './userCoverReducer'
import userCommentsReducer from './userCommentsReducer'


const store=configureStore({
    reducer:{
        username:userNameReducer,
        userimage:userImageReducer,
        usercoverimage:userCoverReducer,
        comments:userCommentsReducer
    }
})
export default store
