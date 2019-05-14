import React, { useEffect, useState, useReducer } from 'react'
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
    items?: any[]
    total_count?: number
    incomplete_results?: boolean
  }
} & T

const UserSearch: React.FC<UserSearchProps> = () => {
  const PAGE_SIZE = 10

  const [query, setQuery] = useState('')
  const [query$] = useState(new BehaviorSubject(''))
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<UserSearchProps['data'] | null>(null)
  const [pagination, dispatch] = useReducer(paginationReducer, {
    pageSize: 10,
    current: 1,
  })

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
          d
            ? from(
                search({
                  query: d,
                  pageSize: pagination.pageSize,
                  page: pagination.current,
                })
              )
            : from(Promise.resolve({ items: [] }))
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
      <UserList isLoading={isLoading} values={data && data.items} />
      <Pagination current={pagination.current} total={pagination.total} />
    </div>
  )
}

export default UserSearch

//
// Helpers
//

async function search(args: { query: string; page: number; pageSize: number }) {
  const { query, page, pageSize } = args
  const data = await fetch(
    `https://api.github.com/search/users?q=${query}&page=${page}&per_page=${pageSize}`
  )
  return await data.json()
}

type Action =
  | { type: 'SET_ONE'; payload: string }
  | { type: 'SET_TWO'; payload: number }

type pagerState = {
  current?: number
  total?: number
  pageSize: number
}

// reducer(state: AppState, action: Action): AppState {
function paginationReducer(state: pagerState, action: Action) {
  switch (action.type) {
    case 'SET_ONE':
      return { ...state, current: 1 }
    case 'SET_TWO':
      return { ...state, current: 2 }
    default:
      throw new Error()
  }
}
