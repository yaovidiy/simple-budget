import { json, error } from '@sveltejs/kit';
import { insertOne } from '$lib/server/db/account.js';

export async function POST({request}) {
  const body = await request.json();
  const insert = await insertOne(body);

  if (!insert) {
    throw error(400, {message: 'Error while adding new account'});
  }

  return json({success: true, message: 'Successfully added new account'});
}