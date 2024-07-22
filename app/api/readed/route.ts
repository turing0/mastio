import { getRedisKey, incrementRedisKey, setRedisKey } from '@/app/libs/redisKey';
import axios from 'axios';
import { NextResponse } from "next/server";

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
    // const { server } = requestData;

    const res1 = await incrementRedisKey(`Mastio:Msg0722:readed`);

    return NextResponse.json({
      msg: "success"
    });

    // return new NextResponse('Missing parameter', { status: 400 });

  } catch (error: any) {
      console.log(error, 'SERVER Not Found');
      return new NextResponse('Internal Error', {status: 500});
  }
}