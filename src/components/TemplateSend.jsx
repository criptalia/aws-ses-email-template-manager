/* eslint-disable no-useless-escape */
import React, { Fragment } from 'react'

const TemplateSend = ({ template }) => {
  if (!template) {
    return <span>Loading...</span>
  }

  const vars = template.match(/{{\s*[\w\.]+\s*}}/g)
  if (vars) return vars.map((x) => x.match(/[\w\.]+/)[0])

  return (
    <Fragment>
      {'Extracted elements: '}
      <tt dangerouslySetInnerHTML={{ __html: vars }} />
    </Fragment>
  )
}

export default TemplateSend
