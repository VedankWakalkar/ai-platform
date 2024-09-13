import { UserButton } from '@clerk/nextjs'
import React from 'react'
import Sidebar from '@/components/shared/Sidebar'
import MobileNav from '@/components/shared/MobileNav'
const Home = () => {
  return (
   <div>
    <Sidebar/>
    <MobileNav/>
   </div>
  )
}

export default Home
