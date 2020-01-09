/* eslint-disable no-useless-escape */
import React, { Fragment } from 'react'

const TemplateSend = ({ template }) => {
  if (!template) {
    return <span>Loading...</span>
  }

  const vars = template.HtmlPart.match(/{{\s*[\w\.]+\s*}}/g).map(function(x) {
    return x.match(/[\w\.]+/)[0]
  })

  console.log(vars)
  return (
    <Fragment>
      {'Extracted elements: '}
      <tt dangerouslySetInnerHTML={{ __html: vars }} />
    </Fragment>
  )
}

export default TemplateSend
