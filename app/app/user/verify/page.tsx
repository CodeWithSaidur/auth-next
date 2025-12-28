import Link from 'next/link'

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen  from-purple-500 via-pink-500 to-red-500 animate-gradient-x">
      🎉 Verification Success! 🎉 <br />
      <Link href="/app/user/login" className="text-center">
        <h1 className="text-5xl font-extrabold text-white drop-shadow-lg animate-bounce"></h1>
        Login
      </Link>
      <br />
    </div>
  )
}
