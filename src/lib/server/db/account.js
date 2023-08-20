import Database from 'better-sqlite3';
import { v4 as uuidv4 } from 'uuid';
import { DB_PATH } from '$env/static/private';

const db = new Database(DB_PATH, { verbose: console.log });

export async function insertOne(data) {
  try {
    const sql = `insert into accounts(id, name, balance, currencyCode) values(@id, @type, @balance, @currencyCode)`;
    const prepare = db.prepare(sql);
    const insert = prepare.run(data);

    console.log(insert);

    return true;
  } catch (err) {
    console.log(err);

    return false;
  }
}

export async function getAccounts() {
  try {
    const sql = `select a.rowid, a.id, a.name, a.balance, c.short as currency from accounts as a inner join currencyCodes as c on a.currencyCode = c.code`;
    const prepare = db.prepare(sql);
    const results = prepare.all();

    return results;
  } catch(err) {
    return [];
  }
}