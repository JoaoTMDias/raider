import NextAuth, { AuthOptions } from 'next-auth'
import SpotifyProvider from "next-auth/providers/spotify";

const AUTH_OPTIONS: AuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET!
    })
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.refresh_token;
      }
      return token;
    },
    async session({
      user,
      session,
      token
    }) {
      session.user = user;
      return session;
    },
  },
}

export default NextAuth(AUTH_OPTIONS);
