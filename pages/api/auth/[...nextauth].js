import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  pages: {
    signIn: '/auth/signin',
  },
  //  todo: upgrading the user sesion and respnse this thing will add the extra information to the response gettig from the google.com
  //  ? exrta username which we don't have before and nore we are having
  callbacks: {
    async session({ session, token, user }) {
      session.user.username = session.user.name
        .split(' ')
        .join('')
        .toLocaleLowerCase()
      session.user.uid = token.sub
      return session
    },
  },
})

