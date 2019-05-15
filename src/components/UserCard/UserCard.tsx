import React from 'react'
import cn from 'classnames'
import Avatar from '../Avatar'
import Button from '../Button'
import { IGitHubUser } from '../../types'
import Styles from './UserCard.module.scss'

export type UserCardProps<T = {}> = {
  user?: IGitHubUser
} & T

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  if (!user) return null
  return (
    <div className={cn(Styles.UserCard)}>
      <div className={cn(Styles.AvatarContainer)}>
        <a href={user.html_url} title={user.login}>
          <Avatar src={user.avatar_url} alt={user.login} />
        </a>
      </div>
      <div className={cn(Styles.InfoContainer)}>
        <div>{user.login}</div>
        <a href={user.html_url}>Profile</a>
      </div>
      <div className={cn(Styles.ActionContainer)}>
        <Button>Follow</Button>
      </div>
      {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
    </div>
  )
}

export default UserCard
