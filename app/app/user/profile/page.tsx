import Link from 'next/link'

const page = () => {
  return (
    <div>
      <h1>Profile Page</h1>
      <Link href="/api/user/logout">logout</Link>
    </div>
  )
}

export default page
