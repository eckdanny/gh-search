import { Subject, from, of } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  tap,
} from 'rxjs/operators'
import { IGitHubUserSearchResponse } from '../../types'

type GitHubUserServiceRequest = {
  query: string
  page?: number
  size?: number
  onStart?: (val: any) => void
  onSuccess?: (res: IGitHubUserSearchResponse) => void
  onError?: (err: any) => void
}

type GitHubUserSearchServiceKwargs = {
  debounce?: number
  minLength?: number
}

class GitHubUserSearchService {
  private subject$ = new Subject<GitHubUserServiceRequest>()
  private DEBOUNCE_TIME: number
  private MIN_SEARCH_CHAR_LENGTH: number

  constructor({
    debounce = 250,
    minLength = 3,
  }: GitHubUserSearchServiceKwargs = {}) {
    this.DEBOUNCE_TIME = debounce
    this.MIN_SEARCH_CHAR_LENGTH = minLength
    this.init()
  }

  init() {
    this.subject$
      .pipe(
        filter(({ query }) => minLength(query, this.MIN_SEARCH_CHAR_LENGTH)),
        debounceTime(this.DEBOUNCE_TIME),
        distinctUntilChanged((prev, curr) => {
          return (
            prev.page === curr.page &&
            prev.size === curr.size &&
            curr.query === prev.query
          )
        }),
        tap(d => d.onStart && d.onStart(d)),
        switchMap(req => {
          if (!req.query) {
            return from(Promise.resolve({ ...req, res: { items: null } }))
          }
          return ajax
            .getJSON(
              `https://api.github.com/search/users` +
                `?q=${req.query}` +
                `&page=${req.page}` +
                `&per_page=${req.size}`
            )
            .pipe(
              map(res => ({ ...req, res })),
              catchError(err => {
                req.onError && req.onError(err)
                return of(err)
              })
            )
        })
      )
      .subscribe(d => d.onSuccess && d.onSuccess(d.res))
    return this
  }

  fetch(params: GitHubUserServiceRequest) {
    this.subject$.next(params)
  }

  destroy() {
    this.subject$.complete()
  }
}

export default GitHubUserSearchService

//
// Helpers
//

function minLength(query: string, minLength: number) {
  return query.length >= minLength || !query.length
}
