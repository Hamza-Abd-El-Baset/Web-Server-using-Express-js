import React from 'react'

const Profile = ({ username, age }) => {
    return (
      <div>
        <label>Username</label>: {username}
        <br></br>
        <label>Age</label>: {age}
      </div>
    )
  }


export default Profile



