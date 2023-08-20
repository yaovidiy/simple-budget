import { json } from '@sveltejs/kit';
import { insertMany } from '$lib/server/db/reciept.js';

export async function POST({request}) {
  const body = await request.json();
  const inserResp = await insertMany(body);

  return json(inserResp);
}