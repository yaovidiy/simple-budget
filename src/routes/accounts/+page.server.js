import { getAccounts } from "$lib/server/db/account";

export async function load() {
  const accounts = await getAccounts();

  if (!accounts.length) {
    return {
      error: true,
      message: 'No accounts found'
    }
  }

  return {
    error: false,
    accounts
  };
}