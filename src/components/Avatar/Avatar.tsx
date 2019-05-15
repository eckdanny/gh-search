import React from 'react'
import cn from 'classnames'
import Styles from './Avatar.module.scss'

type AvatarProps<T = {}> = React.ImgHTMLAttributes<HTMLImageElement> & {
  href?: string
} & T

const Avatar: React.FC<AvatarProps> = ({ className, ...props }) => {
  return <img className={cn(Styles.Avatar, className)} {...props} />
}

Avatar.defaultProps = {
  width: 48,
  height: 48,
}

export default Avatar
