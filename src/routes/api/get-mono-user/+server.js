import { json } from '@sveltejs/kit';

export async function GET({fetch}) {
  const token = 'uq9OQAvNb5-FXn-6IETimpBz8Pl31RYK6R_gGOg0FQxA';

  const resp = await fetch('https://api.monobank.ua/personal/client-info', {
    method: 'GET',
    headers: {
      'X-Token': token
    }
  });

  const res = await resp.json();

  return json(res);
}