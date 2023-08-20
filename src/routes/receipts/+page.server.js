import { getGeneralAll } from "$lib/server/db/reciept";

export async function load() {
  const reciepts = getGeneralAll();

  return {reciepts};
}