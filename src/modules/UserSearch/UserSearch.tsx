import React, { useEffect, useState, ChangeEvent } from 'react'
import BasicUserSearchForm from './BasicUserSearchForm'
import UserList from './UserList'
import { Subject, from } from 'rxjs'
import {
  filter,
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
} from 'rxjs/operators'

export type UserSearchProps<T = {}> = {
  // Nothing here yet
} & T

const UserSearch: React.FC<UserSearchProps> = () => {
  let basicQuery$: Subject<string>
  let search$: Subject<string>

  // const [basicQuery, setBasicQuery] = useState(null)

  const [users, setUsers] = useState(null)

  useEffect(() => {
    console.log('setup!')
    basicQuery$ = new Subject()
    // basicQuery$.subscribe(x => console.log(x))
    basicQuery$
      .pipe(
        filter(q => q.length >= 3 || !q.length),
        debounceTime(250),
        // map((e: any) => e.target.value)
        distinctUntilChanged(),
        switchMap(d => {
          return d ? from(searchUsers(d)) : from(Promise.resolve({ items: [] }))
        })
      )
      .subscribe(x => setUsers(x.items))
    return () => {
      console.log('tear down')
      basicQuery$.complete()
    }
  })

  useEffect(() => {
    search$ = new Subject()
    // search$.subscribe(x => console.log(search$))
    return () => {
      console.log('tear down search$ subscriptions')
      search$.complete()
    }
  })

  return (
    <div>
      <BasicUserSearchForm
        onSubmit={event => {
          event.preventDefault()
          search$.next()
        }}
        onInputChange={event => {
          // console.log(event.target.value)
          basicQuery$.next(event.target.value)
        }}
      />
      {/* <UserList values={users} /> */}
    </div>
  )
}

export default UserSearch

//
// Helpers
//

function searchUsers(query: string) {
  return fetch(`https://api.github.com/search/users?q=${query}`).then(data =>
    data.json()
  )
}
