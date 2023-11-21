<script lang="ts">
  import type { Result } from './types';
  
  type MonthRow = { month: string, colspan: number };

  export let input: Result;
  export let max: number|undefined;
  let monthRows: MonthRow[] = [];
  $: monthRows = getMonthRows(input);

  let maxValue: number = 0;
  $: maxValue = getMaxValue(input, max);

  const getMonthRows = (result: Result): MonthRow[] => {
    const rows: MonthRow[] = [];
    for (let i = 0; i < result.monthIdx.length; i++) {
      const idx = result.monthIdx[i];
      const nextIdx = i >= result.monthIdx.length - 1 ? result.table.length : result.monthIdx[i + 1];
      rows.push({ month: i.toString(), colspan: nextIdx - idx });
    }
    console.log(rows);
    return rows;
  };

  const getMaxValue = (result: Result, forceMax: number|undefined): number => {
    if (forceMax !== undefined) return forceMax;
    return Math.max(...result.table.flat().map(x => x ?? 0));
  };
</script>

<table cellpadding="0" cellspacing="1">
  <thead>
    <tr>
      <th></th>
      {#each monthRows as month}
        <th colspan={month.colspan}>{month.month}</th>
      {/each}
    </tr>
  </thead>
  <tbody>
    {#each Array(7) as _, i}
      <tr>
        <th>.</th>
        {#each Array(input.table.length) as _, j}
          <td>{input.table[j][i]}</td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>

<style>
  th, td {
    border: 1px solid #000000;
  }
</style>
