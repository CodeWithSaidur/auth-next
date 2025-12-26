import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { User } from '@/src/user.model'
import { connectDB } from '@/src/db'
import bcrypt from 'bcryptjs'
import { sendEmail } from '@/src/mail'

export async function GET() {
  return NextResponse.json({
    message: 'signup running'
  })
}

export async function POST(req: NextRequest) {
  try {
    await connectDB()
    const reqBody = await req.json()
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
      password: await bcrypt.hash(password, 12)
    })

    const savedUser = await newUser.save()

    console.log(`Email Sending.....`)
    await sendEmail({ email, emailType: 'VERIFY', userId: savedUser._id })
    console.log(`Email Send Successfully.....`)

    return NextResponse.json(
      {
        message: 'User Created'
      },
      {
        status: 200
      }
    )
  } catch (error) {
    console.log('Error in Signup Route')

    return NextResponse.json(
      {
        message: 'Internal Error in Signup'
      },
      { status: 500 }
    )
  }
}
