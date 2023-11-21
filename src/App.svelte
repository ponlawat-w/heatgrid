<script lang="ts">
  import HeatGrid from './components/HeatGrid.svelte';
  import data from './data/data.json';

  const years = [...new Set<number>(data.map(x => parseInt(x.date.substring(0, 4))))];
  const minYear = Math.min(...years);
  
  const showYears: number[] = [];
  for (let i = minYear; i <= new Date().getUTCFullYear(); i++) {
    showYears.push(i);
  }

  const minDate = new Date(Math.min(...data.map(x => new Date(`${x.date}T00:00:00z`).getTime())));
  const min = Math.min(...data.map(x => x.value));
  const max = Math.max(...data.map(x => x.value));
</script>

<div class="container">
  {#each showYears as year}
    <HeatGrid year={year} data={data} min={min} max={max} minDate={minDate} />
  {/each}
</div>

<style>
  .container {
    margin: 5px 0;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
</style>
