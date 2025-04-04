'use client'

import React,{useState, useEffect} from 'react'
import { UserButton, useUser } from '@clerk/nextjs'

function Dashboard(){
    return(
        <div className='p-8'>
        <h2 className='font-bold text-4xl'>hi, Name</h2>
    </div>
    )
}


export default Dashboard()

