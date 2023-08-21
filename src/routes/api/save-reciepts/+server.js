import { json } from '@sveltejs/kit';
import { insertManyReceipts } from '$lib/server/db/reciept.js';

export async function POST({request}) {
  const body = await request.json();
  const inserResp = await insertManyReceipts(body);

  return json(inserResp);
}