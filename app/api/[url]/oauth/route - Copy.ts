import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { useRouter } from 'next/navigation';
import { NextResponse } from "next/server";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const { url } = req.query;
//   const urlParams = new URL(req.url, "http://localhost").searchParams;
//   const code = urlParams.get('code');

//   if (code) {
//     const response = await axios.post(`https://${url}/oauth/token`, {
//       client_id: 'fsTCP1D5AdVgiDDEmfEs6n9gEku-qDt3kuZbaJJxmvY',
//       client_secret: 'fiV-BRSuxriLt37ffbBmp2FeAlPrTykgRssI4yoOphA',
//       code: code,
//       grant_type: 'authorization_code',
//       redirect_uri: `${HOSTURL}/api/${url}/oauth`,
//     })
    
//     console.log(response.data)
//     const accesstoken = response.data.access_token

//     res.redirect(`${HOSTURL}/api/signin/callback?server=${url}&token=${accesstoken}`);
//     return; // End the response here.
//   } 
  
//   res.status(200).json({message: url+code});
//   return; // End the response here.
// }
const HOSTURL = process.env.HOST_URL;

export default async function GET(
    request: Request,
    {
      params,
    }: {
      params: { url: string };
    },
  ) {
    const url = params.url; // 'a', 'b', or 'c'
    const urlParams = new URL(request.url).searchParams;
    const code = urlParams.get('code');

    if (code) {

      const response = await axios.post(`https://${url}/oauth/token`, {
        client_id: 'fsTCP1D5AdVgiDDEmfEs6n9gEku-qDt3kuZbaJJxmvY',
        client_secret: 'fiV-BRSuxriLt37ffbBmp2FeAlPrTykgRssI4yoOphA',
        code: code,
        grant_type: 'authorization_code',
        redirect_uri: `${HOSTURL}/api/${url}/oauth`,
      })
      
      console.log(response.data)
      const accesstoken = response.data.access_token

      return NextResponse.redirect(`${HOSTURL}/api/signin/callback?server=${url}&token=${accesstoken}`);
      // return NextResponse.json(response.data, { status: 200 });
    } 
    
    return new NextResponse(url+code, { status: 200 });
  }


// export async function GET(
//     req: NextApiRequest, res: NextApiResponse
//   ) {
//       const { domain } = req.query

//       console.log(domain)

//       return new NextResponse('domain:' + domain, { status: 200 });
//       // return NextResponse.json(url[0], { status: 200 });

//       // return new NextResponse('Missing parameter', { status: 400 });
        
//   }
