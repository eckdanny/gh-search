import React from 'react'
import { Button, Input } from '../../../components'

export type BasicUserSearchFormProps<T = {}> = React.FormHTMLAttributes<
  HTMLFormElement
> & {
  onInputChange?: React.ChangeEventHandler<HTMLInputElement>
  inputValue?: string
} & T

/*

<div class="card" style="width: 18rem;">
  <img src="..." class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>

*/

const BasicUserSearchForm: React.FC<BasicUserSearchFormProps> = ({
  onSubmit,
  inputValue,
  onInputChange,
}) => {
  return (
    <form className="form-inline" onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="username-search-input">Username</label>
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
      </div>
      <Button type="submit" className="sr-only">
        Search
      </Button>
    </form>
  )
}

export default BasicUserSearchForm
