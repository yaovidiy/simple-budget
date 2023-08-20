<script>
  export let data;
  export let form;

  let rows = form?.rows || data?.receipts?.rows;
  
  function displayTime(time) {
    const dateTime = time * 1000;

    const date = new Date(dateTime);

    return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
  }

  function expenses(array) {
    return array.reduce((acc, value) => {
      if (value.amount > 0) {
        return acc;
      }

      acc += (value.amount * -1) / 100;
      acc = Math.floor(acc * 100) / 100;

      return acc;
    }, 0);
  }

  function income(array) {
    return array.reduce((acc, value) => {
      if (value.amount < 0) {
        return acc;
      }

      acc += value.amount / 100;
      acc = Math.floor(acc * 100) / 100;

      return acc;
    }, 0);
  }
</script>

{#if data?.receipts?.error}
  <span style="color: red">{data?.message}</span>
{/if}

{#if form?.deleteError}
  <span style="color:red">{form?.message}</span>
{/if}
{#if form?. deleteSuccess}
  <span style="color:green">Successfully deleted!</span>
{/if}
<form action="?/filter" method="post">
  <input type="date" value={form?.time || ''} name="time" id="time">
  <select name="cat" value={form?.cat || ''} id="cat">
    <option value="">All</option>
    {#each data.categories as category}
      <option value={category.title}>{category.title}</option>
    {/each}
  </select>
  <input type="submit" value="selete date">
</form>
<table>
  <tr>
    <th>Date</th>
    <th>Category</th>
    <th>Currency</th>
    <th>Amount</th>
    <th>Description</th>
    <th>Action</th>
  </tr>
  {#if !data?.error}
    {#each rows as row}
      <tr>
        <td>{displayTime(row.time)}</td>
        <td>{row.mccTitle}</td>
        <td>{row.currency}</td>
        <td>{row.amount / 100}</td>
        <td>{row.description}</td>
        <td>
          <a href={`/receipts/edit/${row.rowid}`}>edit</a>
          <form action="?/delete" method="post">
            <input type="hidden" name="rowid" value={row.rowid} />
            <input type="submit" value="delelte">
          </form>
        </td>
      </tr>
    {/each}
    <tr>
      <td colspan="3">Expenses</td>
      <td>{expenses(rows)}</td>
      <td>Income</td>
      <td>{income(rows)}</td>
    </tr>
  {/if}
    
</table>
