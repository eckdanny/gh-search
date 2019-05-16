import React, { Fragment } from 'react'
import cn from 'classnames'
import { UserCard } from '../../../components'
import { IGitHubUser } from '../../../types'
import Styles from './UserList.module.scss'

export type UserListProps<T = {}> = {
  /** Array of GitHub user objects */
  values?: IGitHubUser[] | null
  /** Whether or not a new list is currently being loaded */
  isLoading?: boolean
} & T

const UserList: React.FC<UserListProps> = ({ values }) => {
  if (!values) return null
  if (!values.length) return <div>Nope, didn't find anything!</div>
  return (
    <div className={cn(Styles.UserList)}>
      {values && values.map(user => <UserCard key={user.id} user={user} />)}
    </div>
  )
  return <pre>{JSON.stringify(values, null, 2)}</pre>
}

export default UserList
