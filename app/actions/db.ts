import Dexie from 'dexie';

// // 创建数据库
// const db = new Dexie('kv-store');

// // 定义数据库模式
// db.version(1).stores({
//   kv: 'key,value',
// });

// export default db;

interface KV {
  key: string;
  value: object[];
}

class KVDatabase extends Dexie {
  kv: Dexie.Table<KV, string>;

  constructor() {
    super('kv-database');
    this.version(1).stores({
      kv: 'key,value',
    });
    this.kv = this.table('kv');
  }
}

const db = new KVDatabase();

export default db;

export async function getKV(key: string): Promise<object[] | null> {
  try {
      const kv = await db.kv.get(key);
      return kv ? kv.value : null;
  } catch (error) {
      console.error(error);
      return null;
  }
}

export async function addKV(key: string, value: object): Promise<void> {
  try {
      const kv = await db.kv.get(key);
      if (kv) {
          kv.value.push(value);
          await db.kv.put(kv);
      } else {
          await db.kv.put({ key, value: [value] });
      }
  } catch (error) {
      console.error(error);
  }
}

export async function deleteFirstKV(key: string): Promise<void> {
  try {
      const kv = await db.kv.get(key);
      if (kv && kv.value.length > 0) {
          kv.value.shift();
          await db.kv.put(kv);
      }
  } catch (error) {
      console.error(error);
  }
}