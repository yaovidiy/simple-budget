import { fail } from '@sveltejs/kit';
import { insertOne } from '$lib/server/db/reciept.js';
import { getMCC } from '$lib/server/db/MCC.js';
import { getAccounts } from '$lib/server/db/account.js';

export async function load() {
  const mccRows = await getMCC();
  const accounts = await getAccounts();
  const mcc = mccRows.filter((mcc, index) => mccRows.findIndex(row => row.title === mcc.title) === index);

  if (!mccRows?.length) {
    return {error: true, message: 'no mcc list found'};
  }

  return {mcc: mcc, accounts};
}

export const actions = {
  default: async ({request}) => {
    const formData = Object.fromEntries(await request.formData());
    formData.amount = formData.amount * -1;
    const insertResult = await insertOne(formData);

    if (insertResult?.error) {
      return fail(400, {...formData, saveError: true})
    }
    return {success: true};
  }
}