import { UserButton } from '@clerk/nextjs'
import React from 'react'

function Files() {
  return (
    <div>
      <span>file</span>
    <UserButton signInFallbackRedirectUrl='/'/>
    </div>
  )
}

export default Files
