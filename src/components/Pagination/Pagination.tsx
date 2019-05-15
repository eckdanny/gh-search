import React from 'react'
import cn from 'classnames'
import Styles from './Pagination.module.scss'

export type PagintionProps<T = {}> = {
  current?: number
  total?: number
} & T

const Pagination: React.FC<PagintionProps> = ({ current, total }) => {
  return (
    <nav className={cn(Styles.Nav)} aria-label="pagination">
      <ul className={cn(Styles.List)}>
        <li className={cn(Styles.Item, 'pagination__item--previous-page')}>
          <a className={cn(Styles.Link)} href="#" aria-disabled="true">
            <span className="visuallyhidden">
              Previous
              <span className="sr-only">page</span>
            </span>
          </a>
        </li>
        <li className={cn(Styles.Item)}>
          <div className={cn(Styles.CurrentInfo)}>
            {current} of {total}
          </div>
        </li>
        <li className={cn(Styles.Item, 'pagination__item--next-page')}>
          <a className={cn(Styles.Link)} href="#" aria-disabled="true">
            <span className="visuallyhidden">
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
