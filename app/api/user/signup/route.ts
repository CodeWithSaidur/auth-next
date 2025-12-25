import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { User } from '@/src/user.model'
import { connectDB } from '@/src/db'

export async function GET() {
  return NextResponse.json({
    message: 'signup running'
  })
}

export async function POST(req: NextRequest) {
  try {
    await connectDB()
    const reqBody = await req.json()
    console.log(reqBody)

    const { username, email, password } = reqBody

    const user = await User.findOne({ email })
    if (user) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 400 }
      )
    }

    const newUser = new User({
      username,
      email,
      password
    })
    const savedUser = await newUser.save()
    console.log('User Save Sussessfullly', savedUser._id)

    return NextResponse.json(
      {
        message: 'User Created'
      },
      {
        status: 200
      }
    )
  } catch (error) {
    console.error('❌ Signup Error:', error) // 👈 Add this
    return NextResponse.json(
      {
        message: 'Internal Error in Signup'
      },
      { status: 500 }
    ) // 👈 Add status
  }
}
