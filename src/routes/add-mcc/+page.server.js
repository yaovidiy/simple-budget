import { addMCC, getMCC, deleteMCC } from '$lib/server/db/MCC.js';

export function load() {
  const rows = getMCC();

  return {
    codes: rows
  }
}

export const actions = {
  add: async ({request}) => {
    const formData = Object.fromEntries(await request.formData());
    const {code, title} = formData;

    addMCC(code, title);

    return {success: true};
  },
  remove: async({request}) => {
    const formData = Object.fromEntries(await request.formData());

    deleteMCC(formData.rowid);

    return {success: true};
  }
}