import NextAuth, { AuthOptions } from 'next-auth'
import SpotifyProvider from "next-auth/providers/spotify";

const AUTH_OPTIONS: AuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: 'user-read-email user-top-read user-read-recently-played'
        }
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      // Add accessToken to the session object
      (session as any).accessToken = token.accessToken;
      return session;
    },
  },
}

export { AUTH_OPTIONS };
export default NextAuth(AUTH_OPTIONS);
