import React from 'react'

export type UserListProps<T = {}> = {
  values: object[] | null
  // nothing here yet
} & T

const UserList: React.FC = props => {
  return <div>USERLIST</div>
}

export default UserList
