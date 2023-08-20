<script>
  import { mccCodes } from '$lib/store.js';
  
  export let data;
  
  let entries = [];

  if (data?.codes.length) {
    mccCodes.set(data.codes);
  }

  mccCodes.subscribe(value => entries = value);
</script>

<form action="?/add" method="post" class="">
  <input type="text" name="code" placeholder="mcc code" required />
  <input type="text" name="title" placeholder="mcc title" required />

  <input type="submit" value="add new mcc code" />
</form>

{#if !entries?.length}
  No entries to be found
{:else}
  <table>
    <tr>
      <th>Code</th>
      <th>Title</th>
      <th>Delete</th>
    </tr>
    {#each entries as entry}
      <tr>
        <td>{entry.code}</td>
        <td>{entry.title}</td>
        <td>
          <form action="?/remove" method="post">
            <input type="hidden" name="rowid" value={entry.rowid}>
            <input type="submit" value="remove">
          </form>
        </td>
      </tr>
    {/each}
  </table>
{/if}

