import { v4 as uuidv4 } from 'uuid';
import { insertOne } from '$lib/server/db/account.js';

export const actions = {
  default: async ({ request }) => {
    const formData = Object.fromEntries(await request.formData());
    console.log(formData);
    formData.balance = formData.balance * 100;
    formData['id'] = uuidv4();

    const insert = await insertOne({...formData});

    if (!insert) {
      return {
        error: true,
        message: 'Failed to add account',
        fields: {...formData}
      };
    }

    return {success: true, message: 'Successfully added the account'};
  }
}