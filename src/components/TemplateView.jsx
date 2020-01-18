import React from 'react'

const TemplateView = ({ template, classes }) => {
  if (!template) return <p>Loading...</p>
  return (
    <div
      style={{
        height: 'calc(80vh + 50px)',
        overflow: 'auto',
        padding: '5px',
      }}
    >
      <div dangerouslySetInnerHTML={{ __html: template }} />
    </div>
  )
}

export default TemplateView
