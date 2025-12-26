import crypto from 'crypto'
import { User } from './user.model'
import nodemailer from 'nodemailer'

type emailType = 'VERIFY' | 'RESET'

interface Params {
  email: string
  emailType: emailType
  userId: string
}

export const sendEmail = async ({ email, emailType, userId }: Params) => {
  const token: string = crypto.randomBytes(32).toString('hex')
  const expiry: Date = new Date(Date.now() + 60 * 60 * 1000)

  await User.findByIdAndUpdate(
    userId,
    emailType === 'VERIFY'
      ? { vToken: token, vTokenExp: expiry }
      : { fpToken: token, fpTokenExp: expiry }
  )

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST!,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER!,
      pass: process.env.SMTP_PASS!
    }
  })

  return transporter.sendMail({
    from: process.env.SMTP_FROM!,
    to: email,
    subject: emailType === 'VERIFY' ? 'Email Verification' : 'Reset Password',
    html: `<p>Click <a href="${process.env.DOMAIN}/api/user/${
      emailType === 'VERIFY' ? 'verify' : 'reset'
    }?token=${token}&id=${userId}&email=${email}"> here</a> to ${
      emailType === 'VERIFY' ? 'verify your email' : 'reset your password'
    }.</p>`
  })
}
