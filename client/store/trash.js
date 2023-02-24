import axios from 'axios'

//Action name
const GET_USER_TRASH = 'GET_USER_TRASH';

//ACTION CREATOR
const _getUserTrash = (allUserTrash) => {
  return {
    type: GET_USER_TRASH,
    payload: allUserTrash
  }
}

// THUNKS
export const getUserTrash = (id) => {
  return async (dispatch) => {
    try{
      const response = await axios.get(`/api/trash/user/${id}`,

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

// const initialState = {
//   singleUserTrash: {}
// }

export default function(state = {}, action) {
  switch (action.type) {
    case GET_USER_TRASH:
      return action.payload
    default:
      return state
  }
}