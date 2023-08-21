import { getByDateAndCat, getGeneralAll, deleteOne } from "$lib/server/db/reciept";
import { getMCC } from "$lib/server/db/MCC.js";
import { getAccounts } from "$lib/server/db/account.js";

export async function load() {
  const allReceipts = await getGeneralAll();
  const allCategories = await getMCC();
  const accounts = await getAccounts();
  const filteredCategories = allCategories.filter((cat, index) => allCategories.findIndex(t => t.title === cat.title) === index);

  if (!allReceipts?.error) {
    return {receipts: allReceipts, categories: filteredCategories, accounts};
  }
  
  return {error: true, message: 'There was an error fetching data from db'};
}

export const actions = {
  filter: async ({request}) => {
    const formData = Object.fromEntries(await request.formData());
    console.log(formData);

    const rows = await getByDateAndCat(formData.time, formData.cat, formData.account);

    console.log(rows);

    if (rows?.error) {
      return {requestError: true};
    }

    return {success: true, rows: rows.rows, time: formData.time, cat: formData.cat, account: formData.account};
  },
  delete: async ({request}) => {
    const formData = Object.fromEntries(await request.formData());
    
    const deleteResult = await deleteOne(formData.rowid);

    if (!deleteResult) {
      return {
        deleteError: true, message: 'We have an error tring to delete this entry'
      };
    }

    return {deleteSuccess: true};
  }
}