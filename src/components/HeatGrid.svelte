<script lang="ts">
  import HeatGridTable from './HeatGridTable.svelte';
import type { MonthIndices, Result, Table, Week } from './types';

  export let year: number = new Date().getUTCFullYear();
  export let data: { date: string, value: number }[] = [];

  let results: Result|undefined = undefined;
  $: results = getResults(year, data);

  const getResults = (year: number, values: { date: string, value: number }[]): Result => {
    let current = new Date(year + '-01-01T00:00:00.00z');
    const table: Table = [];
    const monthIdx: MonthIndices = Array(12).fill(-1) as MonthIndices;
    let week: Week = Array(7).fill(undefined) as Week;
    while (current.getUTCFullYear() === year) {
      const dow = current.getUTCDay();
      const month = current.getUTCMonth();
      const date = current.getUTCDate();
      if (date === 1) {
        monthIdx[month] = table.length;
      }
      const amount = values
        .filter(x => x.date === `${year}-${month + 1}-${date}`)
        .reduce((sum, val) => sum + val.value, 0);
      week[dow] = amount;
      if (dow > 5) {
        table.push(week);
        week = Array(7).fill(undefined) as Week;
      }
      current.setTime(current.getTime() + 86400000);
    }
    if (current.getUTCDay() > 0) {
      table.push(week);
    }
    return { table, monthIdx };
  };
</script>

{#if results}
  <HeatGridTable input={results} />
{/if}
