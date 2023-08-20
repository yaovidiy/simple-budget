<script>
  import Chart from 'chart.js/auto'
  import { browser } from '$app/environment';
	import { onMount } from 'svelte';

  export let data;
  
  function displayTime(time) {
    const dateTime = time * 1000;

    const date = new Date(dateTime);

    return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
  }

  
  onMount(() => {
    let catChart = document.getElementById('byCat');
    let dateChart = document.getElementById('byDate');
    
    if (browser) {
      const expensesDataByCategory = data.reciepts.rows.reduce((acc, value) => {
        if (value.amount > 0) return acc;

        if (!acc[value.mccTitle]) {
          acc[value.mccTitle] = 0;
        }
        
        acc[value.mccTitle] +=(value.amount * -1)/100;

        acc[value.mccTitle] = Math.floor(acc[value.mccTitle]*100)/100

        return acc;
      }, {});
      const expensesDataByDay = data.reciepts.rows.reduce((acc, value) => {
        if (value.amount > 0) return acc;

        if (!acc[displayTime(value.time)]) {
          acc[displayTime(value.time)] = 0;
        }
        
        acc[displayTime(value.time)] +=(value.amount * -1)/100;

        acc[displayTime(value.time)] = Math.floor(acc[displayTime(value.time)]*100)/100

        return acc;
      }, {});
      const keys = Object.keys(expensesDataByCategory).map(key => key);
      const values = Object.keys(expensesDataByCategory).map(key => expensesDataByCategory[key]);
      
      new Chart(catChart, {
        type: 'pie',
        data: {
          labels: keys,
          datasets: [{
            label: 'Expenses by MCC',
            data: values
          }]
        }
      });

      new Chart(dateChart, {
        type: 'line',
        data: {
          labels: Object.keys(expensesDataByDay).reverse().map(key => key),
          datasets: [{
            label: 'Expenses by date',
            data: Object.keys(expensesDataByDay).reverse().map(key => expensesDataByDay[key])
          }]
        }
      })
    }
  })

</script>

<div style="width: 800px">
  <canvas id="byCat"></canvas>
</div>
<div style="width: 800px">
  <canvas id="byDate"></canvas>
</div>
<style></style>