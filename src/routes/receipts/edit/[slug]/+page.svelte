<script>
  export let data;
  export let form;

  function transfomDate(seconds) {
    const date = new Date(seconds * 1000);

    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  }
</script>

{#if data?.item?.error}
  <span style="color:red">No data found!</span>
{/if}

{#if form?.error}
  <span style="color:red">{form?.message}</span>
{/if}
{#if form?.success}
  <span style="color:green">Updated!</span>
{/if}
<form method="post">
  {#if !data?.items?.error}
    <input type="hidden" value={data?.item?.item?.rowid} name="rowid">
    <input type="text" name="amount" id="amount" value={data?.item?.item?.amount / 100}>
    <select value={data?.item?.item?.currencyCode.toString() || ''} name="currencyCode" id="currencyCode">
      <option value="980" selected>UAH</option>
      <option value="840" selected>USD</option>
    </select>
    <select name="mcc" id="mcc" value={data?.item?.item?.mcc || ''}>
      {#each data?.categories as cat}
        <option value={cat.code}>{cat.title} - {cat.code}</option>
      {/each}
    </select>
    <select name="account" value={data?.item?.item?.accountID} id="account">
      <option value="">None</option>
      {#each data?.accounts as account}
        <option value={account.id}>{account.name} - {account.currency}</option>
      {/each}
    </select>
    <textarea name="description" id="description" cols="30" rows="10">{data?.item?.item?.description}</textarea>
    <input type="date" name="time" id="time" value={transfomDate(data?.item?.item?.time)}>
    <input type="submit" value="Update!">
  {/if}
</form>
