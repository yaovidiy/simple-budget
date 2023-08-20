import { json } from '@sveltejs/kit';
import { MONO_TOKEN } from '$env/static/private';

export async function POST({fetch, request}) {
  const body = await request.json();
  const token = MONO_TOKEN;
  const from = getDaysAgo(15);
  const resp = await fetch(`https://api.monobank.ua/personal/statement/${body.account}/${from}/`, {
    method: 'GET',
    headers: {
      'X-Token': token
    }
  });

  const res = await resp.json();

  return json(res);
}

function getDaysAgo(days) {
  const date = new Date();

  date.setDate(1);
  
  return date.getTime();
}