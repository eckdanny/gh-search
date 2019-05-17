import React from 'react'
import { Alert } from '../../components'

type RxJSGitHubHttpErr = {
  status: number
  response: {
    message: string
    documentation_url: string
  }
}

export type ErrorAlertProps<T = {}> = React.HTMLAttributes<HTMLDivElement> & {
  error: RxJSGitHubHttpErr | string | boolean
} & T

const ErrorAlert: React.FC<ErrorAlertProps> = props => {
  const { error } = props
  if ((error as RxJSGitHubHttpErr).status === 403) {
    return (
      <Alert>
        <p>{(error as RxJSGitHubHttpErr).response.message}</p>
        <p>
          See{' '}
          <a href={(error as RxJSGitHubHttpErr).response.documentation_url}>
            error help
          </a>
          .
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
