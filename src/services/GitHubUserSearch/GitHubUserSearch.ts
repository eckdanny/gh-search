import { BehaviorSubject, Subject, from } from 'rxjs'
import {
  tap,
  filter,
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from 'rxjs/operators'
import { IGitHubUserSearchResponse } from '../../types'

// private module constants
const PAGE_SIZE = 10
const DEBOUNCE_TIME = 250
const MIN_SEARCH_CHAR_LENGTH = 3

type GitHubUserServiceRequest = {
  query: string
  page?: number
  size?: number
}

// type GitHubUserServiceResponse = {}

const noop = () => {}

class GitHubUserSearchService {
  private onNext: (val: GitHubUserServiceRequest) => void
  private onSuccess: (val: any) => void
  private onError: (val: any) => void
  private subject$: Subject<GitHubUserServiceRequest>

  constructor() {
    this.subject$ = new Subject()
    this.onNext = noop
    this.onSuccess = noop
    this.onError = noop
  }

  next(onNext: (val: any) => void) {
    this.onNext = onNext
    return this
  }

  error(onError: (err: any) => any) {
    this.onError = onError
    return this
  }

  success(onSuccess: (val: any) => void) {
    this.onSuccess = onSuccess
    return this
  }

  // initialValue???
  init() {
    this.subject$
      .pipe(
        filter(
          ({ query }) => query.length >= MIN_SEARCH_CHAR_LENGTH || !query.length
        ),
        debounceTime(DEBOUNCE_TIME),
        distinctUntilChanged(),
        tap(this.onNext),
        switchMap(req => {
          return req.query
            ? from(search(req))
            : from(Promise.resolve({ items: null, page: 1, size: 10 }))
        })
        // handle Errors?
      )
      .subscribe(res => {
        this.onSuccess(res)
      })
    return this
  }

  fetch(params: GitHubUserServiceRequest) {
    this.subject$.next({
      query: params.query || '',
      page: params.page || 1,
      size: params.size || PAGE_SIZE,
    })
  }

  send() {
    this.subject$.subscribe()
  }

  destroy() {
    this.subject$.complete()
  }
}

export default GitHubUserSearchService

//
// Helpers
//

async function search(args: GitHubUserServiceRequest) {
  const { query, page, size } = args
  const data = await fetch(
    `https://api.github.com/search/users?q=${query}&page=${page}&per_page=${size}`
  )
  return await data.json()
}
