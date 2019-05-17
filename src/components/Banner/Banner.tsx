import React from 'react'
import cn from 'classnames'
import Styles from './Banner.module.scss'

type BannerProps<T = {}> = React.HTMLAttributes<HTMLDivElement> & {
  // nothing here yet
} & T

const Banner: React.FC<BannerProps> = props => (
  <div
    {...props}
    className={cn(
      'd-flex flex-column justify-content-center d-flex align-items-center',
      Styles.Banner,
      props.className
    )}
    role="banner"
  />
)

export default Banner
