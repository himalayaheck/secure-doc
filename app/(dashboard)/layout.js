import React from 'react'
import SideNav from './_componants/SideNav'
import TopHeader from './_componants/TopHeader'

function layout({children}) {
  return (
    <div>
        <div className=' h-full md:w-64 flex-col fixed insert-y-0 z-50 md:flex hidden'>
            <SideNav/>
        </div>
        <div className='md:ml-64'>
            <TopHeader/>
            {children}
        </div>
      
    </div>
  )
}

export default layout
