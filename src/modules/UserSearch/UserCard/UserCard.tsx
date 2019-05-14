import React from 'react'
import Avatar from '../Avatar'
import { IGitHubUser } from '../../../types'
import Styles from './UserCard.module.css'

export type UserCardProps<T = {}> = {
  user?: IGitHubUser
} & T

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  if (!user) return null
  return (
    <div className={Styles.UserCard}>
      <div>{user.login}</div>
      <Avatar src={user.avatar_url} />
      <a href={user.html_url}>Profile</a>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  )
}

export default UserCard
