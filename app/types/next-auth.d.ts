// import NextAuth from "next-auth"
// import { JWT } from "next-auth/jwt"

// declare module "next-auth/jwt" {
//   /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
//   interface JWT {
//     /** OpenID ID Token */
//     server: string;
//     accessToken: string;
//   }
// }

// declare module "next-auth" {
//   /**
//    * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
//    */
//   interface Session {
//     server: string;
//     accessToken: string;
//     // user: {
//     //   /** The user's postal address. */
//     //   id: string
//     //   name: string
//     //   accessToken: string
//     // }
//   }
// }