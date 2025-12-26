import { User } from '@/src/user.model'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const token = searchParams.get('token')
    const email = searchParams.get('email')

    const isaldradyVerified = await User.findOne({ email, isVerified: true })
    if (isaldradyVerified) {
      return Response.json(
        {
          message: 'User Aldrady Verified'
        },
        {
          status: 200
        }
      )
    }

    const user = await User.findOneAndUpdate(
      {
        vToken: token,
        vTokenExp: { $gt: Date.now() }
      },
      {
        $set: { isVerified: true },
        $unset: { vToken: 1, vTokenExp: 1 }
      }
    )

    if (!user) {
      return Response.json(
        {
          message: 'invalid Token'
        },
        {
          status: 400
        }
      )
    }

    return Response.json(
      {
        message: 'Verification Success'
      },
      {
        status: 200
      }
    )
  } catch (error) {
    return Response.json(
      {
        error: 'Verification failed'
      },
      {
        status: 500
      }
    )
  }
}
