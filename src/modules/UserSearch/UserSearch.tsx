import React, { useEffect, useState, useReducer, Fragment } from 'react'
import { BehaviorSubject, from } from 'rxjs'
import {
  tap,
  filter,
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from 'rxjs/operators'
import BasicUserSearchForm from './BasicUserSearchForm'
import UserList from './UserList'
import Pagination from '../../components/Pagination'

// private module constants
const PAGE_SIZE = 10
const DEBOUNCE_TIME = 250
const MIN_SEARCH_CHAR_LENGTH = 3

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
  const [query, setQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<UserSearchProps['data'] | null>(null)
  const [pagination, dispatch] = useReducer(paginationReducer, {
    pageSize: PAGE_SIZE,
  })

  const [_query$] = useState(new BehaviorSubject(''))
  useEffect(() => {
    const subscription = _query$.subscribe(setQuery)
    const service = _query$
      .pipe(
        tap(val => dispatch({ type: 'CHANGE_QUERY', payload: val })),
        filter(q => q.length >= MIN_SEARCH_CHAR_LENGTH || !q.length),
        debounceTime(DEBOUNCE_TIME),
        distinctUntilChanged(),
        tap(() => dispatch({ type: 'FETCH_START' })),
        switchMap(d =>
          d
            ? from(
                search({
                  query: d,
                  pageSize: pagination.pageSize,
                  page: pagination.currentPage,
                })
              )
            : from(Promise.resolve({ items: [] }))
        ),
        tap(() => dispatch({ type: 'FETCH_SUCCESS' }))
        // handle Errors?
      )
      .subscribe(res => {
        // dispatch here
        setData(res)
      })
    return () => {
      subscription.unsubscribe()
      service.unsubscribe()
    }
  }, [])

  return (
    <div>
      <BasicUserSearchForm
        inputValue={query}
        isLoading={pagination.isLoading}
        onInputChange={event => _query$.next(event.target.value)}
      />
      <p>{pagination.q}</p>
      {data && data.items && (
        <Fragment>
          <UserList isLoading={isLoading} values={data.items} />
          <Pagination isLoading={isLoading} total={pagination.itemTotal} />
        </Fragment>
      )}
    </div>
  )
}

export default UserSearch

//
// Helpers
//

type searchArgs = {
  query: string
  page?: number
  pageSize?: number
}

async function search(args: searchArgs) {
  const { query, page, pageSize } = args
  const data = await fetch(
    `https://api.github.com/search/users?q=${query}&page=${page}&per_page=${pageSize}`
  )
  return await data.json()
}

type Action =
  | { type: 'INCR_PAGE' }
  | { type: 'DECR_PAGE' }
  | { type: 'CHANGE_QUERY'; payload: string }
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS' }
  | { type: 'GOT_RESULTS' }

type pagerState = {
  q?: string
  isLoading?: boolean
  itemTotal?: number
  currentPage?: number
  pageSize: number
}

function paginationReducer(state: pagerState, action: Action) {
  switch (action.type) {
    case 'INCR_PAGE':
    case 'DECR_PAGE':
      return state
    case 'FETCH_START':
      return {
        ...state,
        isLoading: true,
      }
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
      }
    case 'CHANGE_QUERY':
      return {
        ...state,
        q: action.payload,
      }
    default:
      throw new Error()
  }
}
