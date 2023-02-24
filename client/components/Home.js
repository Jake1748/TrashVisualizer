import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import { getUserTrash } from '../store/trash'

/**
 * COMPONENT
 */
export const Home = props => {
  const {username, trash} = props
  useEffect(() => {props.getUserTrash(props.user.id)}, [])

  return (
    <div>
      <h3>Welcome, {username}</h3>
      <p>Trash: {trash}</p>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.auth,
    trash: state.userTrash.singleUserTrash
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUserTrash: (id) => {dispatch(getUserTrash(id))}
  }
}

export default connect(mapState,mapDispatchToProps)(Home)
