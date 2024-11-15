import React from 'react'
import Spinner from '@atlaskit/spinner'

function Loading() {
  return (
    <div className='loading h-dvh flex items-center justify-center'>
        <Spinner size="xlarge" />
    </div>
  )
}

export default Loading