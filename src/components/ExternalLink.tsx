import React from 'react'

export default function ExternalLink({children, to, target="_blank"}) {
  return (
    <a target={target} rel='noopener noreferrer' href={to}>{children}</a>
  )
}
