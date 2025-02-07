/** A utility counter component (eg. X / Y) */
export const CounterLabel = ({
  selected,
  total,
  conjunctionLabel = "/",
}: {
  selected: number;
  total: number;
  conjunctionLabel?: React.ReactNode;
}) => {
  return (
    <span>
      <b>{selected}</b> {` ${conjunctionLabel} ${total}`}
    </span>
  );
};
