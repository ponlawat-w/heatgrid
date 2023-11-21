export type Value = number | undefined;
export type Week = [Value, Value, Value, Value, Value, Value, Value];
export type Table = Week[];
export type MonthIndices = [number, number, number, number, number, number, number, number, number, number, number, number];
export type Result = {
  table: Table,
  monthIdx: MonthIndices
};
