import { getOne, updateOne } from '$lib/server/db/reciept.js';
import { getMCC } from "$lib/server/db/MCC.js";

export async function load({params}) {
  const item = await getOne(params.slug);
  const categories = await getMCC();
  
  return {item, categories};
}

function transformToSeconds(time) {
  const date = new Date(time);

  return Math.floor(date.getTime() / 1000);
}

export const actions = {
  default: async ({request}) => {
    const formData = Object.fromEntries(await request.formData());
    
    formData.amount = formData.amount * 100;
    formData.time = transformToSeconds(formData.time);

    const update = await updateOne(formData);

    if (!update) {
      return {error: true, message: 'Error on update!'};
    }
    
    return {success: true};
  }
}