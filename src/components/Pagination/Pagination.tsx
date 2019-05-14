import React from 'react'

export type PagintionProps<T = {}> = {
  current?: number
  total?: number
} & T

const Pagination: React.FC<PagintionProps> = ({ current, total }) => {
  return (
    <nav aria-label="pagination">
      <ul className="pagination">
        <li className="pagination__item pagination__item--previous-page">
          <a
            className="pagination__link pagination__link--is-disabled"
            href="#"
            aria-disabled="true"
          >
            <span className="visuallyhidden">
              Previous
              <span>page</span>
            </span>
          </a>
        </li>
        <li className="pagination__item">
          {current} of {total}
        </li>
        <li className="pagination__item pagination__item--next-page">
          <a
            className="pagination__link pagination__link--is-disabled"
            href="#"
            aria-disabled="true"
          >
            <span className="visuallyhidden">
              Next
              <span>page</span>
            </span>
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default Pagination
