<script>
  export let form;

  console.log(form);
</script>

<h1>Add new account</h1>

{#if form?.error}
  <span style="color:red">{form?.message}</span>
{/if}
{#if form?.success}
  <span style="color:green">{form?.message}</span>
{/if}
<form method="post">
  <input type="text" value={form?.fields?.type || ''} name="type" id="type" placeholder="Account name" />
  <select name="currencyCode" value={form?.fields?.currencyCode?.toString() || '980'} id="currencyCode">
    <option value="980">UAH</option>
    <option value="840">USD</option>
  </select>
  <input type="number" value={form?.fields?.balance ? form?.fields?.balance / 100 : 0} name="balance" id="balance" placeholder="Account initial balance" />
  <input type="submit" value="Add" />
</form>
