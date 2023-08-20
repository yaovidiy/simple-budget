<script>
  let accounts = [];
  let reciepts = [];
  let save = {error: false};

  async function getAccounts() {
    const resp = await fetch('/api/get-mono-user');
    const res = await resp.json();

    console.log(res);
    accounts = res.accounts;
  }

  async function saveAccount(account) {
    try {
      const resp = await fetch('/api/save-account', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(account)
      });
  
      if (!resp.ok) {
        const error = await resp.json();
        alert(error.message);
        return;
      }

      const res = await resp.json();

      console.log(res);
      alert(res.message);
    } catch(err) {
      console.log(err);
      alert('check console!');
    }
  }

  async function getReciepts(account) {
    const resp = await fetch(`/api/get-account/`, {
      method: 'post',
      body: JSON.stringify({account})
    });
    const res = await resp.json();

    reciepts = res;
  }

  function displayTime(time) {
    const dateTime = time * 1000;

    const date = new Date(dateTime);

    return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
  }

  async function saveReciepts() {
    try {
      const resp = await fetch('/api/save-reciepts', {
        method: 'post',
        body: JSON.stringify(reciepts)
      });

      const res = resp.json();

      save = res;
    } catch(err) {
      console.log(err);
      save = {error: true};
    }
  }
</script>

{#if !accounts.length}
  <button on:click={getAccounts}>Get accounts</button>
{:else}
  <table>
    <tr>
      <th>id</th>
      <th>Name</th>
      <th>balance</th>
      <th>action</th>
    </tr>
    {#each accounts as account}
      <tr>
        <td>{account.id}</td>
        <td>{account.type}</td>
        <td>{account.balance / 100}</td>
        <td>
          <button on:click={() => getReciepts(account.id)}>Show receipts</button>
          <button on:click={() => saveAccount(account)}>Save account to DB</button>
        </td>
      </tr>
    {/each}
  </table>
{/if}

{#if reciepts.length}
  <button on:click={saveReciepts}>Save to DB</button>
  {#if save.error}
    There was an error while saving data
  {/if}
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