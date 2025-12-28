'use client'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import Marquee from 'react-fast-marquee'

const Page = () => {
  const [user, setUser] = useState({ username: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [disabledButton, setDisabledButton] = useState(false)
  const router = useRouter()

  const onSignup = async () => {
    try {
      const res = await axios.post('/api/user/signup', user)
      console.log(res.data)
      toast.success('Signup Success')
      router.push('/')
    } catch (error) {
      console.log('Failed to Send POST Request')
      toast.error('Failed to Send POST Request')
    }
  }

  useEffect(() => {
    if (
      user.username.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setDisabledButton(false)
    } else {
      setDisabledButton(true)
    }
  }, [user])

  return (
    <div>
      <div>
        <h1 className="text-center">{loading ? 'Sending...' : 'Signup'}</h1>
        <Marquee>Don't Submit blank Input box</Marquee>
        <label htmlFor="username">Username </label>
        <input
          type="text"
          value={user.username}
          onChange={e => setUser({ ...user, username: e.target.value })}
          placeholder="Enter Username"
        />

        <label htmlFor="email">email </label>
        <input
          type="text"
          value={user.email}
          onChange={e => setUser({ ...user, email: e.target.value })}
          placeholder="Enter email"
        />

        <label htmlFor="password">password </label>
        <input
          type="text"
          value={user.password}
          onChange={e => setUser({ ...user, password: e.target.value })}
          placeholder="Enter password"
        />

        <button onClick={onSignup} className="cursor-pointer">
          {disabledButton ? 'Signup' : 'No Signup'}
        </button>
        <br />
        <Link href="/app/user/login" className="text-center">
          Login
        </Link>
      </div>
    </div>
  )
}

export default Page
