import axios from 'axios'

//Action name
const GET_ALL_USERS = 'GET_ALL_USERS';

//ACTION CREATOR
const _getAllUsers = (allUsers) => {
  return {
    type: GET_ALL_USERS,
    payload: allUsers
  }
}

// THUNKS
export const getProducts = () => {
  return async (dispatch) => {
    try{
      const response = await axios.get('/api/products',

       //AUTHORIZATION SEND TOKEN
       {
        headers: {
          authorization: window.localStorage.getItem('token')
        }
      }

      )
      const products = response.data
      dispatch(gotProducts(products))
    } catch(e){
      console.log("ERROR in THUNK getProducts: ", e);
    }
  }
}


export default function(state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth
    default:
      return state
  }
}