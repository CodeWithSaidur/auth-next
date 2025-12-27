import './globals.css'

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html temporarily-dark-simple={''} native-dark-active={''}>
      <body>{children}</body>
    </html>
  )
}
