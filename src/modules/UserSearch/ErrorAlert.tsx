import React from 'react'
import { Alert } from '../../components'

type RxJSGitHubHttpErr = {
  staus: number
  response: {
    message: string
    documentation_url: string
  }
}

export type ErrorAlertProps<T = {}> = React.HTMLAttributes<HTMLDivElement> & {
  error: RxJSGitHubHttpErr | string | boolean
} & T

const ErrorAlert: React.FC<ErrorAlertProps> = props => {
  if (props.error.status === 403) {
    return (
      <Alert>
        <p>{props.error.response.message}</p>
        <p>
          See <a href={props.error.response.documentation_url}>error help</a>.
        </p>
      </Alert>
    )
  }
  return (
    <Alert>
      <p>Sorry! An unknown error occured :(</p>
    </Alert>
  )
}

export default ErrorAlert
