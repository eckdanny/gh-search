import React, { useState, useReducer, Fragment, useEffect } from 'react'
import BasicUserSearchForm from './BasicUserSearchForm'
import UserList from './UserList'
import { Pagination, Spinner } from '../../components'
import { GitHubUserSearch } from '../../services'
import { IGitHubUserSearchResponse } from '../../types'
import {
  userSearchReducer,
  changeQuery,
  fetchStart,
  fetchSuccess,
  fetchError,
} from './userSearchReducer'

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
  const [searchService] = useState(new GitHubUserSearch().init())

  const [state, dispatch] = useReducer(userSearchReducer, {
    page: 1,
    size: 10,
    query: '',
    isLoading: false,
    total: null,
    items: null,
    error: null,
  })

  useEffect(() => {
    searchService.fetch({
      query: state.query,
      page: state.page,
      size: state.size,
      onStart: () => dispatch(fetchStart()),
      onSuccess: res => dispatch(fetchSuccess(res)),
      onError: (err: any) => dispatch(fetchError(err)),
    })
  }, [state.query, state.page, state.size])

  // hack: ensure subject$.complete() in case not GC'd
  useEffect(() => () => searchService.destroy(), [])

  return (
    <div>
      <BasicUserSearchForm
        inputValue={state.query}
        isLoading={state.isLoading}
        onInputChange={e => dispatch(changeQuery(e.target.value))}
      />
      {state.isLoading && (
        <div className="text-center my-5">
          <Spinner className="text-primary" />
        </div>
      )}
      {!state.isLoading && state.items && state.total && (
        <Fragment>
          <UserList users={state.items} total={state.total} />
          <Pagination total={state.total} />
        </Fragment>
      )}
    </div>
  )
}

export default UserSearch

//
// Helpers
//

// type searchArgs = {
//   query: string
//   page?: number
//   pageSize?: number
// }

// type Action =
//   | { type: 'INCR_PAGE' }
//   | { type: 'DECR_PAGE' }
//   | { type: 'CHANGE_QUERY'; payload: string }
//   | { type: 'FETCH_START' }
//   | { type: 'FETCH_SUCCESS'; payload: IGitHubUserSearchResponse }
//   | { type: 'GOT_RESULTS' }

// type pagerState = {
//   query?: string
//   isLoading?: boolean
//   itemTotal?: number
//   currentPage?: number
//   pageSize: number
//   items: IGitHubUserSearchResponse['items'] | null
// }

// function paginationReducer(state: pagerState, action: Action): pagerState {
//   switch (action.type) {
//     case 'INCR_PAGE':
//     case 'DECR_PAGE':
//       return state
//     case 'FETCH_START':
//       return {
//         ...state,
//         isLoading: true,
//         items: null,
//       }
//     case 'FETCH_SUCCESS':
//       console.log(action.payload)
//       return {
//         ...state,
//         itemTotal: action.payload.total_count,
//         items: action.payload.items,
//         isLoading: false,
//       }
//     case 'CHANGE_QUERY':
//       return {
//         ...state,
//         query: action.payload,
//       }
//     default:
//       throw new Error()
//   }
// }
