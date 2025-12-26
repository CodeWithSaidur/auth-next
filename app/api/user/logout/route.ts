import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const res = NextResponse.json({
      message: 'Logout  SUccess!'
    })

    res.cookies.delete('jwttoken')

    return res
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Logout Riute Not Working!'
      },
      {
        status: 500
      }
    )
  }
}
