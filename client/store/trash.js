import axios from 'axios'

//Action name
const GET_USER_TRASH = 'GET_USER_TRASH';

//ACTION CREATOR
const _getUserTrash = (allUserTrash) => {
  return {
    type: GET_ALL_USERS,
    payload: allUserTrash
  }
}

// THUNKS
export const getUserTrash = () => {
  return async (dispatch) => {
    try{
      const response = await axios.get('/api/products',

      //AUTHORIZATION SEND TOKEN
      {
        headers: {
          authorization: window.localStorage.getItem('token')
        }
      })

      const trash = response.data
      dispatch(_getUserTrash(trash))
    } catch(e){
      console.log("ERROR in THUNK getUserTrash: ", e);
    }
  }
}

const initialState = {
  singleUserTrash: {}
}

export default userTrashReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_TRASH:
      return {...state, singleUserTrash: [...action.payload]}
    default:
      return state
  }
}