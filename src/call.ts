import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'

export const getData = async (req: NextRequest) => {
  try {
    const token = req.cookies.get('jwttoken')?.value || ''

    console.log('Getting data Token☠️ ', token)

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!)
    console.log('Getting Data Decoded🎯', decoded)

    console.log(decoded.id)

    return decoded.id
  } catch (error) {
    throw new Error('Error in Getting Data')
  }
}
