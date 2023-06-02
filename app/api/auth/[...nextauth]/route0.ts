// import NextAuth, { AuthOptions} from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';

// // export const authOptions: AuthOptions = {
// const authOptions: AuthOptions = {
//     providers:[
//         CredentialsProvider({
//             name: 'Credentials',
//             credentials: {
//                 url: {label: 'url', type: 'text'},
//                 // user: {label: 'user', type: 'text'},
//                 accessToken: {label: 'Access Token', type: 'text'},
//             },
//             async authorize(credentials) {
//                 if (!credentials) {
//                     return null
//                 }

//                 const user = { 
//                     id: '123',
//                     name: 'ocam@mail.com', 
//                     accessToken: credentials.accessToken, 
//                     server: credentials.url, 
//                  }

//                  return user
//             }
//         })
//     ],
//     debug: process.env.NODE_ENV === 'development',
//     session: {
//         strategy: "jwt",
//     },
//     callbacks: {
//         async jwt({ token, user }) {

//           if (user) {
//             token.accessToken = (user as any).accessToken
//             token.server = (user as any).server
//           }
//           return token
//         },
//         async session({session, token}) {
//           session.accessToken = token.accessToken
//           session.server = token.server
//           return session
//         },
//       },
//     secret: process.env.NEXTAUTH_SECRET, // openssl rand -base64 32
// };

// const handler = NextAuth(authOptions);
// export {handler as GET, handler as POST};
