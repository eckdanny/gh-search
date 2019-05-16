import React from 'react'
import cn from 'classnames'
import Styles from './Pagination.module.scss'

export type PagintionProps<T = {}> = {
  current?: number
  total?: number
  isLoading?: boolean
  isDisabledNext?: boolean
  isDisabledPref?: boolean
  onClickNext?: React.EventHandler<React.SyntheticEvent<HTMLAnchorElement>>
  onClickPrev?: React.EventHandler<React.SyntheticEvent<HTMLAnchorElement>>
} & T

const Pagination: React.FC<PagintionProps> = ({ current, total }) => {
  return (
    <nav className={cn(Styles.nav)} aria-label="pagination">
      <ul className={cn(Styles['pagination'])}>
        <li className={cn(Styles['page-item'], Styles['disabled'])}>
          <a className={cn(Styles['page-link'])} href="#" aria-disabled="true">
            <span>
              Previous
              <span className="sr-only">page</span>
            </span>
          </a>
        </li>
        <li className={cn(Styles['page-item'])}>
          <div className={cn(Styles['page-current-info'])}>
            {current} of {total}
          </div>
        </li>
        <li className={cn(Styles['page-item'])}>
          <a className={cn(Styles['page-link'])} href="#" aria-disabled="true">
            <span>
              Next
              <span className="sr-only">page</span>
            </span>
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default Pagination
