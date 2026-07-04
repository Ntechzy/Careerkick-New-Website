type ReadingTimeProps = {
  value: string;
};

export function ReadingTime({ value }: ReadingTimeProps) {
  return <span>{value}</span>;
}
