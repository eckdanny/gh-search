import React from 'react'
import { IGitHubUser } from '../../../types'

export type UserCardProps<T = {}> = {
  user?: IGitHubUser
} & T

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  if (!user) return null
  return (
    <div>
      <div>{user.login}</div>
      <img src={user.avatar_url} />
      <a href={user.html_url}>Profile</a>
      {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
    </div>
  )
}

export default UserCard
