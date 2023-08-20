import Database from 'better-sqlite3';
import { DB_PATH } from '$env/static/private';

const db = new Database(DB_PATH, { verbose: console.log });

export async function addMCC(code, title) {
  const sql = `insert into mccCategories(code, title) values(?, ?)`;
  try {
    const prepare = db.prepare(sql);
    
    prepare.run(code, title);

    return {error: false};
  } catch(err) {
    return {error: true, errorMessage: err};
  }
}

export async function getMCC() {
  try {
    const sql = `select rowid, code, title from mccCategories`;
    const prepare = db.prepare(sql);
    const rows = prepare.all();
  
    return rows;
  } catch(err) {
    return [];
  }
}

export async function deleteMCC(rowid) {
  try {
    const sql  = 'delete from mccCategories where rowid=?';
    const prepare = db.prepare(sql);
    
    prepare.run(rowid);
    
    return {error: false};
  } catch(err) {
    return {error: true, errorMessage: err};
  }
}
