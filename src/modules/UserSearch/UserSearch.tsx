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
  const [searchService] = useState(new GitHubUserSearch().init())

  const [state, dispatch] = useReducer(userSearchReducer, {
    page: 1,
    size: pageSize || 10,
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
          <Pagination
            {...selectPaginationProps(state)}
            onClickNext={() => dispatch(incrementPage())}
            onClickPrev={() => dispatch(decrementPage())}
          />
        </Fragment>
      )}
    </div>
  )
}

export default UserSearch

UserSearch.defaultProps = {
  pageSize: 10,
}

//
//
//

function selectPaginationProps(state: UserSearchState) {
  return {
    total: state.total || 0,
    current: state.page,
    isDisabledPrev: false,
    isDisabledNext: false,
  }
}
