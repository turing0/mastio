import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv()

const setRedisKey = async (key: string, value: string) => {
    if (key && value) {
        await redis.set(key, value)
        // console.log('setRedisKey: ', value);
        return value;
    }
    return null;
};

const getRedisKey = async (key: string) => {
    if (key) {
      const value = await redis.get(key);
      // console.log('getRedisKey: ', value);
      return value;
    }
    return null;
  };

export { setRedisKey, getRedisKey };