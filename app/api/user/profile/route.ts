import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/src/db'
import { getData } from '@/src/call'
import { User } from '@/src/user.model'

export async function GET(req: NextRequest) {
  try {
    await connectDB()

    const userId = await getData(req)

    console.log('userID ', userId)

    const user = await User.findById({ _id: userId }).select('-password')

    return NextResponse.json({
      message: 'User found',
      data: user
    })
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Prifile Route Not Working'
      },
      {
        status: 500
      }
    )
  }
}
