import React from 'react'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const Home = props => {
  const {username, trash} = props

  return (
    <div>
      <h3>Welcome, {username}</h3>
      <h3>Trash: {trash}</h3>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    username: state.auth.username,
    trash: state.userTrash.singleUserTrash
  }
}

export default connect(mapState)(Home)
