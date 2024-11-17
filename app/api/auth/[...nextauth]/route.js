import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { connectToDB } from '@utils/database';
import { createUser, getUserByEmail } from '@models/user';  // Import necessary functions

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope: 'openid profile email', // Ensure these scopes are included
        },
      },
    }),
  ],
  callback: {
    async session({ session }) {
      // Get user info from PostgreSQL and store the user id in the session
      const user = await getUserByEmail(session.user.email);
      if (user) {
        session.user.id = user.id.toString();  // Assuming 'id' is the primary key
      }
      return session;
    },
    async signIn({ account, profile, user, credentials }) {
      try {
        await connectToDB();  // Connect to PostgreSQL

        // Check if the user already exists in the database
        const userExists = await getUserByEmail(profile.email);

        // If the user doesn't exist, create a new user
        if (!userExists) {
          const newUser = {
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          };
          await createUser(newUser);  // Create user in PostgreSQL
        }

        return true;  // Sign in successful
      } catch (error) {
        console.log("Error checking if user exists: ", error.message);
        return false;  // If error occurs during sign-in
      }
    },
  },
});

export { handler as GET, handler as POST };
