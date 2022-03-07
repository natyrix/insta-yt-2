import React from 'react'
import { signOut, useSession } from 'next-auth/react'

export default function MiniProfile() {
  const {data: session} = useSession();
  return (
    <div className='flex items-center justify-between mt-14 ml-10'>
        <img src={session.user.image} alt="" className='h-16 w-16 object-contain border p-[2px] rounded-full'/>
        <div className="flex-1 mx-4">
            <h2 className='font-bold'>{session.user.name}</h2>
            <h3 className='text-s text-gray-400'>Welcome to Instagram</h3>
        </div>
        <button className='text-blue-400 text-sm font-semibold' onClick={signOut}>Sign Out</button>
    </div>
  )
}
