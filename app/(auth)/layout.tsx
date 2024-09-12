import React from 'react'

const layout = ({children}:{children:React.ReactNode}) => {
  return (
    <main className="auth">
         {children}
    </main>
  )
}

export default layout
