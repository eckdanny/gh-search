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
import { Pagination, Spinner } from '../../components'
import { GitHubUserSearch } from '../../services'
import { IGitHubUserSearchResponse } from '../../types'

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
    items: null,
  })

  const [ghus] = useState(() => {
    return new GitHubUserSearch()
      .next(NEXT => dispatch({ type: 'FETCH_START' }))
      .error(ERR => console.log({ ERR }))
      .success(VAL => dispatch({ type: 'FETCH_SUCCESS', payload: VAL }))
      .init()
    // return () => ghus.destroy()
  })

  return (
    <div>
      <BasicUserSearchForm
        inputValue={pagination.q}
        isLoading={pagination.isLoading}
        onInputChange={event => {
          ghus.fetch({
            query: event.target.value,
            size: pagination.pageSize,
            page: 1,
          })
        }}
      />
      <Fragment>
        {pagination.isLoading && (
          <div className="text-center my-5">
            <Spinner />
          </div>
        )}
        {!pagination.isLoading && pagination.items && (
          <Fragment>
            <UserList isLoading={isLoading} values={pagination.items} />
            <Pagination isLoading={isLoading} total={pagination.itemTotal} />
          </Fragment>
        )}
      </Fragment>
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
  | { type: 'FETCH_SUCCESS'; payload: IGitHubUserSearchResponse }
  | { type: 'GOT_RESULTS' }

type pagerState = {
  q?: string
  isLoading?: boolean
  itemTotal?: number
  currentPage?: number
  pageSize: number
  items: IGitHubUserSearchResponse['items'] | null
}

function paginationReducer(state: pagerState, action: Action): pagerState {
  switch (action.type) {
    case 'INCR_PAGE':
    case 'DECR_PAGE':
      return state
    case 'FETCH_START':
      return {
        ...state,
        isLoading: true,
        items: null,
      }
    case 'FETCH_SUCCESS':
      console.log(action.payload)
      return {
        ...state,
        itemTotal: action.payload.total_count,
        items: action.payload.items,
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
