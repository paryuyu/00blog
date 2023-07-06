import { LoadingSpinner } from '@/components/LoadingSpinner'
import React from 'react'

const loading = () => {
  return (
    <div className='w-full h-full flex justify-center items-center'>
      <LoadingSpinner type="loading"/>
    </div>
  )
}

export default loading