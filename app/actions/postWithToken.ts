import axios from "axios";
import { getKV } from "./db";

interface MyObject {
    server: string;
    token: string;
}

export async function postWithToken(url: string, params?: Object) {
    const values =  await getKV('users');
    // console.log('db values[0]:', (values as MyObject[])?.[0]);

    const token = (values as MyObject[])?.[0]?.token;
    

    if (!token) {
        return null;
    }

    const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
    };

    try {
      const response = await axios.post(url, params, { headers });
    //   console.log('postWithToken response:', response?.data);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
}

