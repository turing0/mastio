import axios from 'axios';

const fetcher = (url: string, token?: string) => {

  const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  // console.log('fetcher2:', url, headers);
  return axios.get(url, { headers }).then((res) => res.data);
};

export default fetcher;