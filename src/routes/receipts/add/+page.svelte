<script>
  export let data;
  export let form;
</script>

{#if data?.error}
  <span style="color:red">{data?.message}</span>
{/if}
{#if form?.success}
  <span style="color: green">Успішно додано!</span>
{/if}
{#if form?.saveError}
  <span style="color:red">Помилка при збережені, спробуй ще раз</span>
{/if}
<form method="post">
  <input value={form?.amount || ''} type="text" name="amount" placeholder="Ціна">
  <select value={form?.mcc || ''} name="mcc" id="mcc">
    <option value=""></option>
    {#if !data?.error}
      {#each data.mcc as mcc}
        <option value={mcc.code}>{mcc.title}</option>
      {/each}
    {/if}
  </select>
  <select value={form?.currencyCode || '980'} name="currencyCode" id="currencyCode">
    <option value="980" selected>UAH</option>
    <option value="840" selected>USD</option>
  </select>
  <textarea name="description" id="description" cols="30" rows="10" placeholder="Опис">{form?.description || ''}</textarea>
  <input type="submit" value="Додати" />
</form>