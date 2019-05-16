import React, { useState, useReducer, Fragment, useEffect } from 'react'
import BasicUserSearchForm from './BasicUserSearchForm'
import UserList from './UserList'
import { Pagination, Spinner } from '../../components'
import { GitHubUserSearch } from '../../services'
import {
  userSearchReducer,
  changeQuery,
  fetchStart,
  fetchSuccess,
  fetchError,
  UserSearchState,
  incrementPage,
  decrementPage,
} from './userSearchReducer'

export type UserSearchProps<T = {}> = {
  pageSize?: number
} & T

const UserSearch: React.FC<UserSearchProps> = ({ pageSize }) => {
  const [searchService] = useState(new GitHubUserSearch())

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
  useEffect(() => {
    searchService.init({
      query: state.query,
      page: state.page,
      size: state.page,
    })
    return () => searchService.destroy()
  }, [])

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
      <UserList
        isLoading={state.isLoading}
        users={state.items}
        total={state.total as number}
      />
      <Pagination
        {...selectPaginationProps(state)}
        onClickNext={() => dispatch(incrementPage())}
        onClickPrev={() => dispatch(decrementPage())}
      />
    </div>
  )
}

export default UserSearch

UserSearch.defaultProps = {
  pageSize: 10,
}

//
// Helpers
//

function selectPaginationProps(state: UserSearchState) {
  return {
    total: state.total || 0,
    current: state.page,
    size: state.size,
    isDisabledPrev: state.page < 2 || state.isLoading,
    isDisabledNext:
      !state.total || state.page >= Math.ceil(state.total / state.size),
    isLoading: state.isLoading,
  }
}
