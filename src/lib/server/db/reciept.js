import Database from 'better-sqlite3';
import { v4 as uuidv4 } from 'uuid';
import { DB_PATH } from '$env/static/private';

const db = new Database(DB_PATH, { verbose: console.log });

export function deleteOne(rowid) {
  const sql = 'delete from receipts where rowid = @rowid';

  try {
    const prepare = db.prepare(sql);
    const result = prepare.run({rowid});
    
    console.log(result);

    return true;
  } catch(err) {
    console.log(err);
    return false;
  }
}

export function updateOne(data) {
  const sql = 'update receipts set amount = @amount, currencyCode = @currencyCode, mcc = @mcc, description = @description, time = @time where rowid = @rowid';
  try {
    const prepare = db.prepare(sql);
    const result = prepare.run(data);

    console.log(result);

    return true;
  } catch(err) {
    console.log(err);
    return false;
  }
}

export function getOne(rowid) {
  const sql = 'select rowid, currencyCode, mcc, currencyCode, amount, description, time from receipts where rowid = @rowid';

  try {
    const prepare = db.prepare(sql);
    const item = prepare.get({rowid});

    return {error: false, item};
  } catch(err) {
    console.log(err);
    return {error: true, item: null};
  }
}

export function getGeneralAll() {
  try {
    const sql = `select receipts.rowid as rowid, id, mccCategories.title as mccTitle, currencyCodes.short as currency, amount, description, time from receipts inner join mccCategories on mccCategories.code = receipts.mcc inner join currencyCodes on currencyCodes.code = receipts.currencyCode order by receipts.time desc`;
  
    const prepare = db.prepare(sql);
    const rows = prepare.all();

    return {error: false, rows};
  } catch(err) {
    console.log(err);
    return {error: true, rows: []};
  }
}

export async function insertOne(receipt) {
  const uuid = uuidv4();
  const time = Math.floor(new Date().getTime() / 1000);
  
  const data = {...receipt, id: uuid, time: time};
  data.amount = data.amount * 100;

  try {
    const sql = 'insert into receipts(id, mcc, currencyCode, amount, description, time) values(@id, @mcc, @currencyCode, @amount, @description, @time)';
    const prepare = db.prepare(sql);
    const res = prepare.run(data);

    return res;
  } catch (err) {
    console.log(err);
    return {error: true, errorMessage: err};
  }
}

export async function getByDateAndCat(date = '', cat = '') {

  const sqlDateAndCat = `select r.rowid as rowid, mcc.title as mccTitle, curr.short as currency, amount, description, time from receipts as r join mccCategories as mcc on mcc.code = r.mcc join currencyCodes as curr on curr.code = r.currencyCode where time >= @startDate and time <= @endDate and mcc.title = @cat order by r.time desc`;
  const sqlDate = 'select r.rowid as rowid, mcc.title as mccTitle, curr.short as currency, amount, description, time from receipts as r join mccCategories as mcc on mcc.code = r.mcc join currencyCodes as curr on curr.code = r.currencyCode where time >= @startDate and time <= @endDate order by r.time desc';
  const sqlCat = 'select r.rowid as rowid, mcc.title as mccTitle, curr.short as currency, amount, description, time from receipts as r join mccCategories as mcc on mcc.code = r.mcc join currencyCodes as curr on curr.code = r.currencyCode where mcc.title = @cat order by r.time desc';
  const sqlAll = 'select r.rowid as rowid, mcc.title as mccTitle, curr.short as currency, amount, description, time from receipts as r join mccCategories as mcc on mcc.code = r.mcc join currencyCodes as curr on curr.code = r.currencyCode order by r.time desc'
  const dateObj = new Date(date);

  const startDate = Math.floor(dateObj.getTime() / 1000);
  dateObj.setDate(dateObj.getDate() + 1);
  const endDate = Math.floor(dateObj.getTime() / 1000);
  try {
    let sql = sqlDateAndCat;
    
    if (date && !cat) {
      sql = sqlDate;
    } else if (!date && cat) {
      sql = sqlCat
    } else if (!date && !cat) {
      sql = sqlAll;
    }

    const prepare = db.prepare(sql);
    const rows = prepare.all({startDate, endDate, cat});

    return {error: false, rows: rows};
  } catch(err) {
    console.log(err);
    return {error: true, message: err};
  }
}

export async function insertMany(receipts) {
  try {
    const sql = 'insert or ignore into receipts(id, mcc, currencyCode, amount, operationAmount, description, cashbackAmount, commissionRate, time) values(@id, @mcc, @currencyCode, @amount, @operationAmount, @description, @cashbackAmount, @commissionRate, @time)';
    const insert = db.prepare(sql);
    
    const insertMany = db.transaction((receipts) => {
      for (const receipt of receipts) insert.run(receipt);
    });

    insertMany(receipts);

    return {error: false};
  } catch(err) {
    console.log(err);
    return {error: true, errorMessage: err};
  }
}