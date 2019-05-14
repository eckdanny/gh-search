import React, { Fragment } from 'react'
import UserCard from '../UserCard'
import { IGitHubUser } from '../../../types'

export type UserListProps<T = {}> = {
  /** Array of GitHub user objects */
  values?: IGitHubUser[] | null
  /** Whether or not a new list is currently being loaded */
  isLoading?: boolean
} & T

const UserList: React.FC<UserListProps> = ({ values }) => {
  if (values === null) return null
  return (
    <Fragment>
      <div>
        {values && values.map(user => <UserCard key={user.id} user={user} />)}
      </div>
    </Fragment>
  )
  return <pre>{JSON.stringify(values, null, 2)}</pre>
}

export default UserList
