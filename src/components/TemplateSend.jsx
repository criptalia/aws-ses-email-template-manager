/* eslint-disable no-useless-escape */
import React, { Fragment } from 'react'

const TemplateSend = ({ template }) => {
  if (!template) {
    return <span>Loading...</span>
  }

  const vars = template.match(/{{\s*[\w\.]+\s*}}/g)
  if (!vars) return null

  const keys = vars.map((x) => x.match(/[\w\.]+/)[0])
  const uniqueKeys = [...new Set(keys)]
  return (
    <Fragment>
      {'Extracted elements: '}
      {uniqueKeys.map((el, index) => (
        <Fragment>
          <label>{el}</label>
          <input key={index} type='text' name={el}></input>
        </Fragment>
      ))}
    </Fragment>
  )
}

export default TemplateSend
