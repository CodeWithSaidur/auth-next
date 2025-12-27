import Link from 'next/link'

export default function Home() {
  return (
    <div className="text-center">
      <h1>HOME</h1>
      <Link href="/app/user/signup">Signup</Link>
    </div>
  )
}
