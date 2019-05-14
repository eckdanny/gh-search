import React, { useEffect, useState } from 'react'
import { BehaviorSubject, from } from 'rxjs'
import {
  filter,
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from 'rxjs/operators'
import BasicUserSearchForm from './BasicUserSearchForm'
import UserList from './UserList'
import Pagination from '../../components/Pagination'

export type UserSearchProps<T = {}> = {
  query?: string
  query$?: BehaviorSubject<string>
  data?: {
    items: any[]
  }
} & T

const UserSearch: React.FC<UserSearchProps> = () => {
  const [query, setQuery] = useState('')
  const [query$] = useState(new BehaviorSubject(''))
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState({ items: [] })

  useEffect(() => {
    const subscription = query$.subscribe(setQuery)
    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    const service = query$
      .pipe(
        filter(q => q.length >= 3 || !q.length),
        debounceTime(250),
        distinctUntilChanged(),
        switchMap(d =>
          d ? from(search(d)) : from(Promise.resolve({ items: [] }))
        )
      )
      .subscribe(res => setData(res))
    return () => service.unsubscribe()
  }, [])

  return (
    <div>
      <BasicUserSearchForm
        inputValue={query}
        onSubmit={event => {
          event.preventDefault()
          console.log('you submitted the form')
        }}
        onInputChange={event => query$.next(event.target.value)}
      />
      <UserList isLoading={isLoading} values={data.items} />
      <Pagination />
    </div>
  )
}

export default UserSearch

//
// Helpers
//

async function search(query: string) {
  const data = await fetch(
    `https://api.github.com/search/users?q=${query}&page=1&per_page=5`
  )
  return await data.json()
}
