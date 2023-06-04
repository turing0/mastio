import { getRedisKey } from "@/app/libs/redisKey";
import axios from "axios";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { parse } from "path";

// export async function GET(req: NextApiRequest, res: NextApiResponse) {
//     try {
//         // const urlParams = new URL(request.url).searchParams;
//         // const server = urlParams.get('url');
//         // const code = urlParams.get('code');
//         // const {url}  = req.query;
//         // const url = request.url;
//         const { url } = req.query; // 从请求参数中获取动态路由参数
//         const { code } = req.query; // 从请求参数中获取 GET 参数
      
//         console.log(url, code);

//         redirect('/google');
//     } catch (error) {
//         console.log(error, 'REGISTER ERROR');
//         return new NextResponse('Internal Error', {status: 500});
//     }
// }
const HOSTURL = process.env.HOST_URL;

export async function GET(request: Request) {
    const { pathname, searchParams } = new URL(request.url)
    // const obj = Object.fromEntries(searchParams.entries())
    const parsedUrl = parse(pathname)
    const server = parsedUrl.dir.split('/')[2]
    const code = searchParams.get('code');
    console.log(server, code);
    
    let clientId = await getRedisKey(`Mastio:client_id:${server}`);
    let clientSecret = await getRedisKey(`Mastio:client_secret:${server}`);
    // if (clientId && clientSecret) {
    //   console.log('clientId clientSecret:', clientId, clientSecret);
    // } else {
    //     const response = await axios.post(`https://${server}/api/v1/apps`, {
    //         client_name: 'Mastio',
    //         redirect_uris: `${HOSTURL}/api/${server}/oauth`,
    //         scopes: 'read write push',
    //         website: `${HOSTURL}`,
    //     });
    //     if (response?.data?.id) {
    //         console.log('get client response:');
    //         console.log(response?.data);
    //         const { client_id, client_secret, vapid_key } = response.data;
    //         clientId = client_id;
    //         clientSecret = client_secret;
    //         const res1 = await setRedisKey(`Mastio:client_id:${server}`, client_id);
    //         const res2 = await setRedisKey(`Mastio:client_secret:${server}`, client_secret);
    //         const res3 = await setRedisKey(`Mastio:vapid_key:${server}`, vapid_key);
    //     }
    // }

    const response = await axios.post(`https://${server}/oauth/token`, {
        client_id: clientId,
        client_secret: clientSecret,
        code: code,
        grant_type: 'authorization_code',
        scope: 'read write push',
        redirect_uri: `${HOSTURL}/api/${server}/oauth`,
    });
        
    const accesstoken = response.data.access_token;
    
    console.log('response.data:');
    console.log(response.data);
    
    redirect(`/api/signin/callback?server=${server}&token=${accesstoken}`);

    // return NextResponse.json(obj);
}
