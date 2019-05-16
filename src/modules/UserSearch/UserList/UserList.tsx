import React, { Fragment } from 'react'
import cn from 'classnames'
import { UserCard } from '../../../components'
import { IGitHubUser } from '../../../types'
import Styles from './UserList.module.scss'

export type UserListProps<T = {}> = {
  /** Array of GitHub user objects */
  users: IGitHubUser[] | null
  /**  */
  total: number
  isLoading?: boolean
} & T

const UserList: React.FC<UserListProps> = ({ users, total }) => {
  if (!users) return null
  if (!users.length) return <div>Nope, didn't find anything!</div>
  return (
    <Fragment>
      <div>
        Found <strong>{total}</strong> matches
      </div>
      <div className={cn(Styles.UserList)}>
        {users && users.map(user => <UserCard key={user.id} user={user} />)}
      </div>
    </Fragment>
  )
}

export default UserList
