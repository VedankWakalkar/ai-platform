import { UserButton } from '@clerk/nextjs'
import React from 'react'

const Home = () => {
  return (
    <div>
      Home
      <UserButton afterSignOutUrl="/" /> {/* Redirect to home after sign out */}
    </div>
  )
}

export default Home
