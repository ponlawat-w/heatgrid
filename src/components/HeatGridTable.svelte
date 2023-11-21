<script lang="ts">
  import { DAYS, MONTHS } from './texts';
  import type { Result, Value } from './types';
  
  type MonthRow = { month: string, colspan: number };
  type Colour = [number, number, number];

  export let year: number;
  export let input: Result;
  export let min: number|undefined = undefined;
  export let max: number|undefined = undefined;
  export let minColour: Colour = [199, 220, 240];
  export let maxColour: Colour = [4, 62, 117];

  let monthRows: MonthRow[] = [];
  $: monthRows = getMonthRows(input);

  let minValue: number = 0;
  $: minValue = getMinValue(input, min);
  let maxValue: number = 0;
  $: maxValue = getMaxValue(input, max);

  const getMonthRows = (result: Result): MonthRow[] => {
    const rows: MonthRow[] = [];
    for (let i = 0; i < result.monthIdx.length; i++) {
      const idx = result.monthIdx[i];
      const nextIdx = i >= result.monthIdx.length - 1 ? result.table.length : result.monthIdx[i + 1];
      rows.push({ month: MONTHS[i], colspan: nextIdx - idx });
    }
    return rows;
  };

  const getMinValue = (result: Result, forceMin: number|undefined): number => {
    if (forceMin !== undefined) return forceMin;
    return Math.min(...result.table.flat().map(x => x ?? 0));
  };
  const getMaxValue = (result: Result, forceMax: number|undefined): number => {
    if (forceMax !== undefined) return forceMax;
    return Math.max(...result.table.flat().map(x => x ?? 0));
  };

  const getColour = (value: Value, minValue: number, maxValue: number, minColour: Colour, maxColour: Colour): string => {
    if (value === undefined) return '#ffffff';
    if (!value) return '#ededed';
    const colour: Colour = [
      ((value - minValue) / (maxValue - minValue) * (maxColour[0] - minColour[0])) + minColour[0],
      ((value - minValue) / (maxValue - minValue) * (maxColour[1] - minColour[1])) + minColour[1],
      ((value - minValue) / (maxValue - minValue) * (maxColour[2] - minColour[2])) + minColour[2]
    ];
    return 'rgba(' + colour + ',1)';
  };
</script>

<table cellpadding="0" cellspacing="1">
  <thead>
    <tr>
      <th class="year" colspan={1 + input.table.length}>{year + 543} <small>({year})</small></th>
    </tr>
    <tr>
      <th></th>
      {#each monthRows as month}
        <th class="month" colspan={month.colspan}>{month.month}</th>
      {/each}
    </tr>
  </thead>
  <tbody>
    {#each Array(7) as _, i}
      <tr>
        <th class="day">{DAYS[i]}</th>
        {#each Array(input.table.length) as _, j}
          <td class="cell" style:background-color={getColour(input.table[j][i], minValue, maxValue, minColour, maxColour)}></td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>

<style>
  th, td {
    font-size: 10px;
    padding: 0;
  }

  th.year {
    color: #000000;
    font-size: 12px;
  }

  th.month {
    color: #666666;
    text-align: left;
  }

  th.day {
    color: #666666;
    text-align: right;
    font-size: 8px;
    padding-right: 2px;
  }

  .cell {
    width: 12px;
    height: 12px;
    overflow: hidden;
  }
</style>
