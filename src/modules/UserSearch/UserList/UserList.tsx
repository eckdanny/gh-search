import React, { Fragment } from 'react'
import UserCard from '../UserCard'
import { IGitHubUser } from '../../../types'

export type UserListProps<T = {}> = {
  values?: IGitHubUser[]
  // nothing here yet
} & T

const UserList: React.FC<UserListProps> = props => {
  return (
    <Fragment>
      <div>MEH</div>
      <div>
        {props.values &&
          props.values.map(user => <UserCard key={user.id} user={user} />)}
      </div>
    </Fragment>
  )
  return <pre>{JSON.stringify(props.values, null, 2)}</pre>
}

export default UserList
