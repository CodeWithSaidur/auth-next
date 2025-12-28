'use client'

import axios from 'axios'
import Link from 'next/link'
import { useState } from 'react'

const page = () => {
  const [data, setdata] = useState('No Data')
  const [email, setEmail] = useState('No Email')

  const getDetail = async () => {
    try {
      const res = await axios.get('/api/user/profile')
      console.log(res.data)
      setdata(res.data.data.username)
      setEmail(res.data.data.email)
    } catch (error) {
      console.log('failed to Get Data from profile route')
    }
  }

  return (
    <div>
      <h1>Profile Page</h1>
      <h1>{data}</h1>
      <h2>{email}</h2>
      <button onClick={getDetail} className="bg-amber-400 rounded-2xl p-3">
        Click to Get Data
      </button>
      <Link href="/api/user/logout">logout</Link>
    </div>
  )
}

export default page
