import React, { useState, useReducer, Fragment } from 'react'
import BasicUserSearchForm from './BasicUserSearchForm'
import UserList from './UserList'
import { Pagination, Spinner } from '../../components'
import { GitHubUserSearch } from '../../services'
import { IGitHubUserSearchResponse } from '../../types'

// private module constants
const PAGE_SIZE = 10

export type UserSearchProps<T = {}> = {
  query?: string
  data?: {
    items?: any[]
    total_count?: number
    incomplete_results?: boolean
  }
} & T

const UserSearch: React.FC<UserSearchProps> = () => {
  const [pagination, dispatch] = useReducer(paginationReducer, {
    pageSize: PAGE_SIZE,
    items: null,
  })

  const [ghus] = useState(() => {
    return new GitHubUserSearch()
      .next(() => dispatch({ type: 'FETCH_START' }))
      .error(ERR => console.log({ ERR }))
      .success(VAL => dispatch({ type: 'FETCH_SUCCESS', payload: VAL }))
      .init()
    // .init({
    //   page: pagination.currentPage,
    //   size: pagination.pageSize,
    //   query: pagination.query,
    // })
  })

  return (
    <div>
      <BasicUserSearchForm
        inputValue={pagination.query}
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
            <Spinner className="text-primary" />
          </div>
        )}
        {!pagination.isLoading && pagination.items && (
          <Fragment>
            <UserList
              isLoading={pagination.isLoading}
              values={pagination.items}
            />
            <Pagination
              isLoading={pagination.isLoading}
              total={pagination.itemTotal}
            />
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

type Action =
  | { type: 'INCR_PAGE' }
  | { type: 'DECR_PAGE' }
  | { type: 'CHANGE_QUERY'; payload: string }
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: IGitHubUserSearchResponse }
  | { type: 'GOT_RESULTS' }

type pagerState = {
  query?: string
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
        query: action.payload,
      }
    default:
      throw new Error()
  }
}
