import React, { useState, useReducer, useEffect } from 'react'
import BasicUserSearchForm from './BasicUserSearchForm'
import UserList from './UserList'
import { Pagination, Spinner } from '../../components'
import { GitHubUserSearch } from '../../services'
import {
  userSearchReducer,
  userSearchActions as actions,
  selectPaginationProps,
} from './userSearchReducer'

export type UserSearchProps<T = {}> = {
  pageSize?: number
} & T

const UserSearch: React.FC<UserSearchProps> = () => {
  const [state, dispatch] = useReducer(userSearchReducer, {
    page: 1,
    size: 10,
    query: '',
    isLoading: false,
    total: null,
    items: null,
    error: null,
  })

  const [searchService] = useState(
    () =>
      new GitHubUserSearch({
        debounce: 250,
        minLength: 3,
      })
  )

  useEffect(() => {
    searchService.fetch({
      query: state.query,
      page: state.page,
      size: state.size,
      onStart: () => dispatch(actions.fetchStart()),
      onSuccess: res => dispatch(actions.fetchSuccess(res)),
      onError: (err: any) => dispatch(actions.fetchError(err)),
    })
  }, [state.query, state.page, state.size])

  // hack: ensure subject$.complete() in case not GC'd
  useEffect(() => () => searchService.destroy(), [])

  return (
    <div>
      <BasicUserSearchForm
        inputValue={state.query}
        isLoading={state.isLoading}
        onInputChange={e => dispatch(actions.changeQuery(e.target.value))}
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
      {state.error && (
        <div className="alert alert-danger" role="alert">
          A simple danger alert with{' '}
          <a href="#" className="alert-link">
            an example link
          </a>
          . Give it a click if you like.
        </div>
      )}
      <Pagination
        {...selectPaginationProps(state)}
        onClickNext={() => dispatch(actions.incrementPage())}
        onClickPrev={() => dispatch(actions.decrementPage())}
      />
    </div>
  )
}

export default UserSearch

UserSearch.defaultProps = {
  pageSize: 10,
}
