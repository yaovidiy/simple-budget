<script>
  export let data;

  let reciepts = [];
  let selectedAccount = null;

  async function saveReceipts() {
    try {
      const modifiedReceipts = reciepts.map(reciept => {
        reciept['account'] = selectedAccount;

        return reciept;
      });
      const resp = await fetch('/api/save-reciepts', {
        method: 'POST',
        body: JSON.stringify(modifiedReceipts)
      });

      if (!resp.ok) {
        console.log(resp.status);
        alert('Error on saving!');
        return;
      }

      const res = await resp.json();

      console.log(res);
      alert('All receipts have been saved');
    } catch(err) {
      console.log(err);
      alert('Error on saving');
    }
  }
  
  async function getReciepts(id) {
    try {
      selectedAccount = id;
      const resp = await fetch(`/api/get-account/`, {
        method: 'post',
        body: JSON.stringify({account: id})
      });
      const res = await resp.json();
  
      reciepts = res;
    } catch(err) {
      console.log(err);
      alert('Check console!');
    }
  }

  function displayTime(time) {
    const dateTime = time * 1000;

    const date = new Date(dateTime);

    return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
  }
</script>

{#if data?.error}
  <span style="color:red">{data?.message}</span>
{/if}

{#if !data?.error}
<table>
  <tr>
    <th>Name</th>
    <th>Balance</th>
    <th>Currency</th>
    <th>Action</th>
  </tr>
</table>
  {#each data?.accounts as account}
    <tr>
      <td>{account.name}</td>
      <td>{account.balance / 100}</td>
      <td>{account.currency}</td>
      <td>
        <button on:click={() => getReciepts(account.id)}>Get receipts</button>
      </td>
    </tr>
  {/each}
{/if}

{#if reciepts.length}
<button on:click={saveReceipts}>Save receipts</button>
  <table>
    <tr>
      <th>Time</th>
      <th>Description</th>
      <th>MCC</th>
      <th>Original MCC</th>
      <th>Currency</th>
      <th>Amount</th>
      <th>Comission</th>
    </tr>
    {#each reciepts as reciept}
      <tr>
        <td>{displayTime(reciept.time)}</td>
        <td>{reciept.description}</td>
        <td>{reciept.mcc}</td>
        <td>{reciept.originalMcc}</td>
        <td>{reciept.currencyCode}</td>
        <td style={`${reciept.amount < 0 ? 'color:red': 'color:green'}`}>{reciept.amount / 100}</td>
        <td>{reciept.commissionRate > 0 ? reciept.commissionRate / 100 : 0}</td>
      </tr>
    {/each}
  </table>
{/if}