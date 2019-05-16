import React from 'react'
import cn from 'classnames'
import { Button, Input } from '../../../components'

export type BasicUserSearchFormProps<T = {}> = React.FormHTMLAttributes<
  HTMLFormElement
> & {
  onInputChange?: React.ChangeEventHandler<HTMLInputElement>
  inputValue?: string
  isLoading?: boolean
} & T

const BasicUserSearchForm: React.FC<BasicUserSearchFormProps> = ({
  onSubmit,
  inputValue,
  onInputChange,
  className,
}) => {
  return (
    <form className={cn(className, 'form-inline')} onSubmit={onSubmit}>
      <div className="form-group">
        <label className="mr-2" htmlFor="username-search-input">
          Username
        </label>
        <Input
          id="username-search-input"
          className="form-control"
          type="search"
          placeholder="eckdanny"
          autoComplete="off"
          spellCheck={false}
          value={inputValue}
          onChange={onInputChange}
        />
        <div className="spinner-border spinner-border-sm" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
      <Button type="submit" className="sr-only">
        Search
      </Button>
    </form>
  )
}

BasicUserSearchForm.defaultProps = {
  onSubmit: event => event.preventDefault(),
}

export default BasicUserSearchForm
