import { Subject, from } from 'rxjs'
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  tap,
} from 'rxjs/operators'
import { IGitHubUserSearchResponse } from '../../types'

const DEBOUNCE_TIME = 250
const MIN_SEARCH_CHAR_LENGTH = 3

type GitHubUserServiceRequest = {
  query: string
  page?: number
  size?: number
  onStart?: (val: any) => void
  onSuccess?: (res: IGitHubUserSearchResponse) => void
  onError?: (err: any) => void
}

const noop = () => {}

class GitHubUserSearchService {
  private subject$ = new Subject<GitHubUserServiceRequest>()

  init(initialValue?: GitHubUserServiceRequest) {
    this.subject$
      .pipe(
        filter(({ query }) => filterQueryByMinLength(query)),
        debounceTime(DEBOUNCE_TIME),
        distinctUntilChanged(),
        // map(d => ({ ...d, page: 1 })),
        tap(d => d.onStart && d.onStart(d)),
        switchMap(req => {
          // TODO: handle non-HTTP 200's here
          return req.query
            ? from(search(req)).pipe(
                map(res => {
                  return {
                    ...req,
                    res,
                  }
                })
              )
            : from(Promise.resolve({ items: null, page: 1, size: 10 })).pipe(
                map(res => {
                  return {
                    ...req,
                    res,
                  }
                })
              )
        }),
        tap(d => d.onSuccess && d.onSuccess(d.res))
      )
      .subscribe()
    if (initialValue) this.subject$.next(initialValue)
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

function filterQueryByMinLength(query: string) {
  return query.length >= MIN_SEARCH_CHAR_LENGTH || !query.length
}

async function search(args: GitHubUserServiceRequest) {
  const { query, page, size } = args
  const data = await fetch(
    `https://api.github.com/search/users?q=${query}&page=${page}&per_page=${size}`
  )
  return await data.json()
}
