import { NextResponse } from "next/server";


export async function GET() {
    const serverList = {
        0: "12",
    } 
    return NextResponse.json( serverList );
}
