import { User } from '@/src/user.model'
import bcrypt from 'bcryptjs'
import Jwt from 'jsonwebtoken'
import { NextResponse } from 'next/server'
import { connectDB } from '@/src/db'

export async function GET() {
  return NextResponse.json({
    message: 'Suucess'
  })
}

export async function POST(req: Request) {
  try {
    await connectDB()

    const { email, password } = await req.json()

    console.log(email, password)

    const user = await User.findOne({ email })
    if (!user) {
      return Response.json(
        {
          message: 'User Not Found'
        },
        {
          status: 401
        }
      )
    }

    if (!user.isVerified) {
      return Response.json(
        {
          message: 'User Not Verified'
        },
        {
          status: 401
        }
      )
    }

    const checkPassword = await bcrypt.compare(password, user.password)
    if (!checkPassword) {
      return Response.json(
        {
          message: 'Incorrect Password'
        },
        {
          status: 401
        }
      )
    }

    const token = Jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: '30d'
    })

    const res = NextResponse.json(
      {
        message: 'Login Success!'
      },
      {
        status: 201
      }
    )

    res.cookies.set('jwttoken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24,
      sameSite: 'strict'
    })

    return res
  } catch (error) {
    return Response.json(
      {
        message: 'Login Route failed'
      },
      {
        status: 500
      }
    )
  }
}
