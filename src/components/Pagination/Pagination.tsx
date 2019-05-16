import React from 'react'
import cn from 'classnames'
import Styles from './Pagination.module.scss'

export type PagintionProps<T = {}> = {
  current?: number
  total: number
  size?: number
  isLoading?: boolean
  isDisabledNext?: boolean
  isDisabledPrev?: boolean
  onClickNext?: React.EventHandler<React.SyntheticEvent<HTMLButtonElement>>
  onClickPrev?: React.EventHandler<React.SyntheticEvent<HTMLButtonElement>>
} & T

const Pagination: React.FC<PagintionProps> = ({
  current,
  size,
  total,
  isDisabledNext,
  isDisabledPrev,
  onClickPrev,
  onClickNext,
}) => {
  if (!size || !total) {
    console.log({ size, total })
    return null
  }
  return (
    <nav className={cn(Styles.nav)} aria-label="pagination">
      <ul className={cn(Styles['pagination'])}>
        <li
          className={cn(Styles['page-item'], {
            [Styles['disabled']]: isDisabledPrev,
          })}
        >
          <button
            className={cn(Styles['page-link'])}
            disabled={isDisabledPrev}
            onClick={onClickPrev}
          >
            <span>
              Previous
              <span className="sr-only">page</span>
            </span>
          </button>
        </li>
        <li className={cn(Styles['page-item'])}>
          <div className={cn(Styles['page-current-info'])}>
            {current} of {Math.ceil(total / size)}
          </div>
        </li>
        <li
          className={cn(Styles['page-item'], {
            [Styles['disabled']]: isDisabledNext,
          })}
        >
          <button
            className={cn(Styles['page-link'])}
            disabled={isDisabledNext}
            onClick={onClickNext}
          >
            <span>
              Next
              <span className="sr-only">page</span>
            </span>
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default Pagination
