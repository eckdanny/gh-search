import { IGitHubUserSearchResponse } from '../../types'
import { PagintionProps } from '../../components/Pagination/Pagination'

// State

export interface UserSearchState {
  page: number
  size: number
  query: string
  isLoading: boolean
  total: number | null
  items: IGitHubUserSearchResponse['items'] | null
  error: string | any | null
}

// Types

const INCR_PAGE = 'INCR_PAGE'
const DECR_PAGE = 'DECR_PAGE'
const CHANGE_QUERY = 'CHANGE_QUERY'
const FETCH = 'FETCH'

// Meta

const START = 'START'
const SUCCESS = 'SUCCESS'

// Actions

export interface IncrementPageAction {
  type: typeof INCR_PAGE
}

export interface DecrementPageAction {
  type: typeof DECR_PAGE
}

export interface ChangeQueryAction {
  type: typeof CHANGE_QUERY
  payload: string
}

export interface FetchAction {
  type: typeof FETCH
  payload?: IGitHubUserSearchResponse | any
  error?: boolean
  meta?: typeof START | typeof SUCCESS
}

export type UserSearchActionType =
  | IncrementPageAction
  | DecrementPageAction
  | ChangeQueryAction
  | FetchAction

// Action Creators

export function incrementPage(): UserSearchActionType {
  return { type: INCR_PAGE }
}

export function decrementPage(): UserSearchActionType {
  return { type: DECR_PAGE }
}

export function changeQuery(query: string): UserSearchActionType {
  return {
    type: CHANGE_QUERY,
    payload: query,
  }
}

export function fetchStart(): UserSearchActionType {
  return {
    type: FETCH,
    meta: START,
  }
}

export function fetchSuccess(
  res: IGitHubUserSearchResponse
): UserSearchActionType {
  return {
    type: FETCH,
    meta: SUCCESS,
    payload: res,
  }
}

export function fetchError(err: any): UserSearchActionType {
  return {
    type: FETCH,
    error: true,
    payload: err,
  }
}

export const userSearchActions = {
  incrementPage,
  decrementPage,
  changeQuery,
  fetchStart,
  fetchError,
  fetchSuccess,
}

// Reducer

export function userSearchReducer(
  state: UserSearchState,
  action: UserSearchActionType
): UserSearchState {
  switch (action.type) {
    case INCR_PAGE:
      return { ...state, page: state.page + 1 }
    case DECR_PAGE:
      return { ...state, page: state.page - 1 }
    case CHANGE_QUERY:
      return { ...state, query: action.payload, page: 1 }
    case FETCH:
      if (action.error) {
        return {
          ...state,
          items: null,
          page: 1,
          isLoading: false,
          error: action.payload,
        }
      } else {
        switch (action.meta) {
          case START:
            return { ...state, isLoading: true, error: false }
          case SUCCESS:
            return {
              ...state,
              isLoading: false,
              error: false,
              total: action.payload.total_count,
              items: action.payload.items,
            }
          default:
            return state
        }
      }
    default:
      return state
  }
}

// Selectors

export function selectPaginationProps(state: UserSearchState): PagintionProps {
  return {
    total: state.total as number,
    current: state.page,
    size: state.size,
    isDisabledPrev: state.page < 2 || state.isLoading,
    isDisabledNext:
      !state.total || state.page >= Math.ceil(state.total / state.size),
    isLoading: state.isLoading,
  }
}
