import { getRedisKey, setRedisKey } from '@/app/actions/redisKey';
import axios from 'axios';
import { NextResponse } from "next/server";

// const MastodonAuth = () => {
//   const router = useRouter();

//     // 获取URL中的授权码
//     const code = new URLSearchParams(window.location.search).get('code');

//     if (code) {
//       // 如果存在授权码，获取访问令牌
//       fetch('https://<your-mastodon-instance>/oauth/token', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           client_id: '<your-app-id>',
//           client_secret: '<your-app-secret>',
//           code: code,
//           grant_type: 'authorization_code',
//           redirect_uri: '<your-callback-url>',
//         }),
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           // 保存访问令牌
//           localStorage.setItem('access_token', data.access_token);
//         });
//     } else {
//       // 如果不存在授权码，重定向用户到授权URL
//       window.location.href = `https://<your-mastodon-instance>/oauth/authorize?client_id=<your-app-id>&redirect_uri=<your-callback-url>&response_type=code`;
//     }
  

//   return 123;
// };

// urn:ietf:wg:oauth:2.0:oob
// const VERCELURL = process.env.VERCEL_URL;
const HOSTURL = process.env.HOST_URL;

export async function POST(
  request: Request
) {
  try {
      // const urlParams = new URL(request.url).searchParams;
      // const serverUrl = urlParams.get('serverUrl');
      // const code = urlParams.get('code');
      // const { server } = await request.json();
      // const {server} = request.json();
      const requestData = await request.json();
      const { server } = requestData;
      // console.log('server:', server);
      if (!server) {
        return NextResponse.json({error: 'Invalid params'});
      }
      let clientId = null;
      clientId = await getRedisKey(`Mastio:client_id:${server}`);
      if (clientId) {
        console.log('clientId:', clientId);
      } else {
        const response = await axios.post(`https://${server}/api/v1/apps`, {
          client_name: 'Mastio',
          redirect_uris: `${HOSTURL}/api/${server}/oauth`,
          scopes: 'read write push',
          website: `${HOSTURL}`,
        });
        if (response?.data?.id) {
            console.log('get client response:');
            console.log(response?.data);
            const { client_id, client_secret, vapid_key } = response.data;
            clientId = client_id;
            const res1 = await setRedisKey(`Mastio:client_id:${server}`, client_id);
            const res2 = await setRedisKey(`Mastio:client_secret:${server}`, client_secret);
            const res3 = await setRedisKey(`Mastio:vapid_key:${server}`, vapid_key);
        }
      }

      if (server) {
        const redirectUrl = 
        `https://${server}/oauth/authorize?client_id=${clientId}&scope=read+write+push&redirect_uri=${HOSTURL}/api/${server}/oauth&response_type=code`;

        return NextResponse.json(redirectUrl);
      }

      // if (!code) {
      //   const response = await axios.post(`https://${serverUrl}/oauth/token`, {
      //     client_id: 'fsTCP1D5AdVgiDDEmfEs6n9gEku-qDt3kuZbaJJxmvY',
      //     client_secret: 'fiV-BRSuxriLt37ffbBmp2FeAlPrTykgRssI4yoOphA',
      //     code: code,
      //     grant_type: 'authorization_code',
      //     redirect_uri: `${HOSTURL}/api/auth`,
      //   })

      //   console.log(response.data())

      //   return NextResponse.json(response.data(), { status: 200 });
      // } 

      return new NextResponse('Missing parameter', { status: 400 });

  } catch (error: any) {
      console.log(error, 'SERVER Not Found');
      return new NextResponse('Internal Error', {status: 500});
  }
}

export async function GET() {

  return NextResponse.json({error: 'Please POST!'});
}