import KakaoProvider from "next-auth/providers/kakao";
import { signIn } from "next-auth/react";
import NextAuth from 'next-auth'
import { connectToDB } from "@/utils/database";
import User from "../../../../../models/user";
const handler = NextAuth({
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET
    })
  ],
  
  callbacks: {
    async session({ session }) {

      await connectToDB();
      console.log(session,'session')
      const sessionUser = await User.findOne({ email: session?.user.email });
      session.user.id = sessionUser._id.toString();

      return session;
    },
    async signIn({ account, profile, user, credentials }) {

      try {

        await connectToDB();
        console.log('signin!')
        // check if user already exists
        const userExists = await User.findOne({ email: profile.kakao_account.email });
        console.log(userExists, 'userExists')

        // if not, create a new document and save user in MongoDB
        if (!userExists) {
          console.log("not user")
          console.log(profile, "<-profile")
          await User.create({
            email: profile.kakao_account.email,
            username: profile.kakao_account.profile.nickname,
            image: profile.kakao_account.profile.profile_image_url,
          });
        }

        return true
      } catch (error) {
        console.log("Error checking if user exists: ", error.message);
        return false
      }
    }
  }
})

export { handler as GET, handler as POST }