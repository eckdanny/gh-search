import React from 'react'
import cn from 'classnames'
import Styles from './Pagination.module.scss'

export type PagintionProps<T = {}> = {
  current?: number
  total?: number
  isDisabledNext?: boolean
  isDisabledPrev?: boolean
  onClickNext?: React.EventHandler<React.SyntheticEvent<HTMLButtonElement>>
  onClickPrev?: React.EventHandler<React.SyntheticEvent<HTMLButtonElement>>
} & T

const Pagination: React.FC<PagintionProps> = ({
  current,
  total,
  isDisabledNext,
  isDisabledPrev,
  onClickPrev,
  onClickNext,
}) => {
  return (
    <nav className={cn(Styles.nav)} aria-label="pagination">
      <ul className={cn(Styles['pagination'])}>
        <li className={cn(Styles['page-item'], Styles['disabled'])}>
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
            {current} of {total}
          </div>
        </li>
        <li className={cn(Styles['page-item'])}>
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
