import React from 'react'
import cn from 'classnames'
import Styles from './Spinner.module.scss'

type SpinnerProps<T = {}> = React.HTMLAttributes<HTMLDivElement> & {
  // nothing here yet
} & T

const Spinner: React.FC<SpinnerProps> = ({}) => {
  return (
    <div
      className={cn(
        'text-primary',
        [Styles['spinner-border']],
        [Styles['spinner-border-lg']]
      )}
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  )
}

export default Spinner
