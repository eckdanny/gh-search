import { IGitHubUserSearchResponse } from '../../types'

// State

interface UserSearchState {
  page: number
  size: number
  query: string
  isLoading: boolean
  total: number | null
  items: IGitHubUserSearchResponse['items'] | null
  error: string | null
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
      return { ...state, query: action.payload }
    case FETCH: {
      if (action.error) {
        return {
          ...state,
          isLoading: false,
          error: 'Oh nos... something bad happened!',
        }
      }
      switch (action.meta) {
        case START: {
          return { ...state, isLoading: true }
        }
        case SUCCESS: {
          return {
            ...state,
            isLoading: false,
            total: action.payload.total_count,
            items: action.payload.items,
          }
        }
      }
    }
    default:
      return state
  }
}
